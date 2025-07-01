"use client"

import { useState } from "react";
import toast from "react-hot-toast";
import emailjs from '@emailjs/browser';

const EmailForm = () => {
  // Environment variables
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  interface mailType {
    company?: string,
    name: string,
    email: string,
    body: string,
  }

  const [mailBody, setMailBody] = useState<mailType>({
    company: '',
    name: '',
    email: '',
    body: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof mailType, value: string) => {
    setMailBody(prev => ({
      ...(prev ?? {}),
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, email, body } = mailBody;

    // Validation
    if (!name || !email || !body) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Check if environment variables are set
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast.error("EmailJS configuration is missing. Please check your environment variables.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Template parameters that match your EmailJS template
      const templateParams = {
        from_name: name,
        from_email: email,
        company: mailBody.company || 'N/A',
        message: body,
        to_name: 'Aoi Kuriki',
      };

      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      if (result.status === 200) {
        toast.success("Message sent successfully!");
        // Reset form
        setMailBody({
          company: '',
          name: '',
          email: '',
          body: ''
        });
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-contact__emailForm">
      <h6>Email : aoi727noel@gmail.com</h6>
      <form className="p-contact__form" onSubmit={handleSubmit}>
        <div className="p-contact__form--inputBox">
          <label>Company Name (Opt.)</label>
          <input 
            type="text"
            value={mailBody?.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Company name"
            disabled={isSubmitting}
          />
        </div>
        <div className="p-contact__form--inputBox">
          <label>Author Name</label>
          <input 
            type="text"
            value={mailBody?.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Author name"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="p-contact__form--inputBox">
          <label>Email</label>
          <input 
            type="email"
            value={mailBody?.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Mail"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="p-contact__form--textarea">
          <label>Body</label>
          <textarea 
            value={mailBody.body}
            onChange={(e) => handleChange("body", e.target.value)}
            rows={5}
            placeholder="body"
            required
            disabled={isSubmitting}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default EmailForm;