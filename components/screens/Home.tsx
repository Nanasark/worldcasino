"use client";
import Link from "next/link";
import { Gift, Ticket, Gamepad2 } from "lucide-react";
import { LoginButton } from "../button/Login";

export default function HomeScreen() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">GameZone</h1>
      </header>

      <main className="flex-grow p-4">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-yellow-600">
            Featured Games
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/mystery-boxes"
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <Gift size={32} className="text-blue-500 mb-2" />
              <span className="text-sm font-medium text-blue-600">
                Mystery Boxes
              </span>
            </Link>
            <Link
              href="/raffles"
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <Ticket size={32} className="text-green-500 mb-2" />
              <span className="text-sm font-medium text-green-600">
                Raffles
              </span>
            </Link>
            <Link
              href="/games"
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <Gamepad2 size={32} className="text-purple-500 mb-2" />
              <span className="text-sm font-medium text-purple-600">
                Mini Games
              </span>
            </Link>
            <LoginButton />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Winners</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center justify-between ">
                <span>John D.</span>
                <span className="text-green-500">$500</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Sarah M.</span>
                <span className="text-green-500">$1,000</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Mike R.</span>
                <span className="text-green-500">$750</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
