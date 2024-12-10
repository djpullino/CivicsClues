import React from 'react';
import Card from 'react-bootstrap/Card';

const Landingpage = () => {
  return (
    <section className="min-h-screen bg-[#301952] flex justify-center items-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-center text-[#301952] mb-8">CivicsClues</h1>

        <Card className="bg-white text-purple-700 shadow-lg rounded-lg mb-6">
          <Card.Body>
            <Card.Title className="text-2xl text-center  text-[#301952] font-semibold mb-2">Learn About Local and National Politics Effectively!</Card.Title>

            <Card.Text className="text-lg text-[#301952] text-center mb-2">
              Join a Community of Like Minded Politics Nerds!
            </Card.Text>
          </Card.Body>
          <div className="flex justify-center space-x-4">
          <Card.Link 
            href="/signup" 
            className="px-6 py-2 bg-[#301952] text-white rounded-lg hover:bg-[#5B3B8C] transition duration-300 ease-in-out no-underline"
            >
            Sign Up
            </Card.Link>
            <Card.Link 
            href="/login" 
            className="px-6 py-2 bg-[#301952] text-white rounded-lg hover:bg-[#5B3B8C] transition duration-300 ease-in-out no-underline"
            >
            Login
            </Card.Link>
        </div>
        </Card>
      </div>
    </section>
  );
};

export default Landingpage;
