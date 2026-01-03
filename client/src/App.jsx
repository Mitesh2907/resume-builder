import React, { useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import { Toaster } from 'react-hot-toast'


const App = () => {

  const dispatch = useDispatch()

  const getUserData = async () => {
    try {
      const { data } = await api.get('/api/users/data')

      if (data?.user) {
        dispatch(login({
          token: localStorage.getItem('token'),
          user: data.user
        }))
      }
    } catch (error) {
      const status = error.response?.status
      console.log("getUserData error:", status)

      // ❗ sirf 401 pe logout
      if (status === 401) {
        localStorage.removeItem('token')
      }
    } finally {
      dispatch(setLoading(false))
    }
  }

  const hasFetched = useRef(false)




  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(setLoading(false))
      return
    }

    getUserData()
  }, [])
  return (
    <>
      <Toaster />
      <Routes>
  {/* PUBLIC */}
  <Route path="/" element={<Home />} />
  <Route path="/view/:resumeId" element={<Preview />} />

  {/* USER */}
  <Route path="/app" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="builder/:resumeId" element={<ResumeBuilder />} />
  </Route>

</Routes>


    </>
  )
}

export default App
