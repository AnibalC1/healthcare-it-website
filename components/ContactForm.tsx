"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    practiceName: "",
    practiceSize: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      // TODO: Replace with actual Supabase submission
      // For now, simulate API call
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        practiceName: "",
        practiceSize: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try calling us directly at (555) 123-4567.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (status === "success") {
    return (
      <div className="bg-primary-light p-8 rounded-card text-center">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-text mb-4">Message Sent!</h3>
        <p className="text-text-muted mb-6">
          Thank you for contacting us. We'll respond within 24-48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn btn-primary"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* HIPAA Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-yellow-800">
            <strong>Privacy Notice:</strong> Do NOT include patient names, medical records,
            diagnoses, or other protected health information (PHI) in this form.
          </div>
        </div>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Dr. Jane Smith"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="jane.smith@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Practice Name */}
      <div>
        <label htmlFor="practiceName" className="block text-sm font-medium text-text mb-2">
          Practice Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="practiceName"
          name="practiceName"
          required
          value={formData.practiceName}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Smith Family Medicine"
        />
      </div>

      {/* Practice Size */}
      <div>
        <label htmlFor="practiceSize" className="block text-sm font-medium text-text mb-2">
          Number of Providers <span className="text-red-500">*</span>
        </label>
        <select
          id="practiceSize"
          name="practiceSize"
          required
          value={formData.practiceSize}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Select...</option>
          <option value="1-3">1-3 providers</option>
          <option value="4-8">4-8 providers</option>
          <option value="9-15">9-15 providers</option>
          <option value="16+">16+ providers</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="Tell us about your IT needs, current setup, or questions you have..."
        />
      </div>

      {/* Error Message */}
      {status === "error" && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-800">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      <p className="text-xs text-text-muted text-center">
        By submitting this form, you agree to our{" "}
        <a href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </a>
        {" "}and{" "}
        <a href="/terms" className="text-primary hover:underline">
          Terms of Service
        </a>
        .
      </p>
    </form>
  );
}
