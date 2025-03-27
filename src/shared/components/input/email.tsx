import { FC, useState } from 'react';

interface EmailInputProps {
  name: string;
  placeholder?: string;
  onEmailChange: (value: string, isValid: boolean) => void;
}

const Email: FC<EmailInputProps> = ({ name, placeholder, onEmailChange }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!value) {
      setError('이메일은 필수입니다');
      return false;
    }

    if (!emailRegex.test(value)) {
      setError('유효한 이메일을 입력해주세요.');
      return false;
    }

    setError('');
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const isValid = validateEmail(value);
    onEmailChange(value, isValid);
  };

  const handleBlur = () => {
    validateEmail(email);
  };

  return (
    <div className="mb-4">
      <input
        type="email"
        name={name}
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
        `}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Email;
