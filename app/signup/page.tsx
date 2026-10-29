'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface SignupForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors extends Partial<SignupForm> {}

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const update = (field: keyof SignupForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email required';
    if (!form.phone.match(/^[+\d\s-]{10,}$/)) newErrors.phone = 'Valid phone number required';
    if (form.password.length < 6) newErrors.password = 'At least 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    toast.success('Account created! Welcome to Rehan Bike Rental 🛵');
    router.push('/dashboard');
  };

  const fields = [
    { id: 'signup-name', field: 'name' as const, label: 'Full Name', icon: User, type: 'text', placeholder: 'Arjun Sharma' },
    { id: 'signup-email', field: 'email' as const, label: 'Email Address', icon: Mail, type: 'email', placeholder: 'you@example.com' },
    { id: 'signup-phone', field: 'phone' as const, label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+91 98765 43210' },
  ];

  return (
    <div className="min-h-screen bg-[#F1F4F6] flex items-center justify-center px-4 pt-20 pb-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4 hover:opacity-95 transition-opacity">
            <Image
              src="/images/logo.png"
              alt="Rehan Bike Rental"
              width={260}
              height={70}
              className="h-14 sm:h-16 w-auto mx-auto object-contain"
              priority
            />
          </Link>
          <h1 className="text-2xl font-extrabold text-[#12334A]">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Join thousands of happy city riders</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <form onSubmit={handleSignup} className="space-y-5">
            {fields.map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="text-sm font-semibold text-gray-700 block mb-2">{f.label}</label>
                <div className="relative">
                  <f.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id={f.id}
                    type={f.type}
                    value={form[f.field]}
                    onChange={(e) => update(f.field, e.target.value)}
                    placeholder={f.placeholder}
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${errors[f.field] ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                  />
                </div>
                {errors[f.field] && <p className="text-xs text-red-500 mt-1">{errors[f.field]}</p>}
              </div>
            ))}

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="text-sm font-semibold text-gray-700 block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  placeholder="At least 6 characters"
                  className={`w-full pl-11 pr-11 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label htmlFor="signup-confirm" className="text-sm font-semibold text-gray-700 block mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="signup-confirm"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => update('confirmPassword', e.target.value)}
                  placeholder="Repeat password"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              id="signup-submit-btn"
            >
              {isLoading ? (
                <><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Creating Account...</>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
