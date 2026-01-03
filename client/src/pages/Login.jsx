import React, { useState } from 'react'
import { Lock, Mail, User2Icon, LoaderCircle } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const Login = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const state = searchParams.get('state') || 'login'

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    try {
      const { data } = await api.post(`/api/users/${state}`, formData)
      dispatch(login(data))
      localStorage.setItem('token', data.token)
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleState = () => {
    setSearchParams({
      state: state === 'login' ? 'register' : 'login'
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="sm:w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === 'login' ? 'Login' : 'Sign up'}
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          Please {state} to continue
        </p>

        {/* Name */}
        {state === 'register' && (
          <div className="mt-6 h-12 flex items-center rounded-full border border-gray-300/80
            px-5 gap-2 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-400">
            <User2Icon size={16} className="text-gray-500 shrink-0" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full h-full bg-transparent border-none outline-none text-sm
                focus:outline-none focus:ring-0"
            />
          </div>
        )}

        {/* Email */}
        <div className="mt-4 h-12 flex items-center rounded-full border border-gray-300/80
          px-5 gap-2 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-400">
          <Mail size={16} className="text-gray-500 shrink-0" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full h-full bg-transparent border-none outline-none text-sm
              focus:outline-none focus:ring-0"
          />
        </div>

        {/* Password */}
        <div className="mt-4 h-12 flex items-center rounded-full border border-gray-300/80
          px-5 gap-2 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-400">
          <Lock size={16} className="text-gray-500 shrink-0" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className="w-full h-full bg-transparent border-none outline-none text-sm
              focus:outline-none focus:ring-0"
          />
        </div>

        {/* Forgot */}
        {state === 'login' && (
          <div className="mt-4 text-left text-green-500">
            <button type="button" className="text-sm">
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 w-full h-11 rounded-full text-white flex items-center
            justify-center gap-2 transition
            ${loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:opacity-90'}`}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin size-4" />
              {state === 'login' ? 'Logging in...' : 'Creating account...'}
            </>
          ) : (
            state === 'login' ? 'Login' : 'Sign up'
          )}
        </button>

        {/* Toggle */}
        <p
          onClick={toggleState}
          className="text-gray-500 text-sm mt-4 mb-10 cursor-pointer"
        >
          {state === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}
          <span className="text-green-500 hover:underline"> click here</span>
        </p>
      </form>
    </div>
  )
}

export default Login
