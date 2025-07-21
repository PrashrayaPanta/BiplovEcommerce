import MapLocation from '@/components/contactComps/MapLocation'
import MessageForm from '@/components/contactComps/MessageForm'
import React from 'react'

function ContactPage() {
  return (
    <div className="container mx-auto my-8 mt-28">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <MapLocation />
        </div>
        <div>
          <MessageForm />
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
