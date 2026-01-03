import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User
} from 'lucide-react'
import React, { useEffect, useState } from 'react'

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground
}) => {

  const [imagePreview, setImagePreview] = useState(null)

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  // safe image preview
  useEffect(() => {
    if (data?.image && typeof data.image === 'object') {
      const url = URL.createObjectURL(data.image)
      setImagePreview(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setImagePreview(null)
    }
  }, [data?.image])

  const fields = [
    { key: 'full_name', label: 'Full Name', icon: User, type: 'text', required: true },
    { key: 'email', label: 'Email Address', icon: Mail, type: 'email', required: true },
    { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel' },
    { key: 'location', label: 'Location', icon: MapPin, type: 'text' },
    { key: 'profession', label: 'Profession', icon: BriefcaseBusiness, type: 'text' },
    { key: 'linkedin', label: 'LinkedIn Profile', icon: Linkedin, type: 'url' },
    { key: 'website', label: 'Personal Website', icon: Globe, type: 'url' }
  ]

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get started with the personal information
      </p>

      {/* Image upload */}
      <div className="flex items-center gap-2 mt-4">
        <label className="cursor-pointer">
          {data?.image ? (
            <img
              src={typeof data.image === 'string' ? data.image : imagePreview}
              alt="User"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-700">
              <User className="size-10 p-2.5 border rounded-full" />
              Upload user image
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            className="hidden"
            onChange={(e) => handleChange('image', e.target.files[0])}
          />
        </label>

        {typeof data?.image === 'object' && (
          <div className="flex flex-col gap-1 pl-4 text-sm">
            <p>Remove Background</p>
            <label className="relative inline-flex items-center cursor-pointer gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeBackground}
                onChange={() => setRemoveBackground(prev => !prev)}
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors duration-200" />
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-4" />
            </label>
          </div>
        )}
      </div>

      {/* Inputs */}
      {fields.map((field) => {
        const FieldIcon = field.icon
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <FieldIcon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            <input
              type={field.type}
              value={data?.[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
              focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        )
      })}
    </div>
  )
}

export default PersonalInfoForm
