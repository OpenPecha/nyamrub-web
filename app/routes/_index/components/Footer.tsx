import { SiGmail } from "react-icons/si";
import { IoIosCall } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="m-8 p-8 flex flex-col justify-between bg-primary-200 rounded-2xl">
      <div className="flex items-center justify-between">
        <img src="/assets/logo.png" alt="Monlam AI Logo" className="h-8" />
        <div className="mt-8 md:mt-0">
          <p className="flex items-center">
            <IoIosCall className="text-neutral-900 mr-2" size={20}/> +91-256256256
          </p>
          <p className="flex items-center mt-2">
            <SiGmail className="text-neutral-900 mr-2" /> Monlamai@gmail.com
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <p className="font-semibold">Monlam AI</p>
          <p>MentseKhang</p>
          <p>Dharamshala, Himachal Pradesh</p>
          <p>173025</p>
        </div>
      </div>

      <div className="mt-8 md:mt-0 flex space-x-6 justify-end">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/linkedin.png" alt="LinkedIn" className="h-8" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/facebook.png" alt="Facebook" className="h-8" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <img src="/assets/github.png" alt="GitHub" className="h-8" />
        </a>
      </div>
    </footer>
  );
}
