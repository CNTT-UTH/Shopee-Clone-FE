import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Checkbox from "../Checkbox";
import logo from '../../assets/images/RecaptchaLogo.svg.png';
import { inputVariants } from "@uth/constants/animation.motion";

interface RobotCaptchaProps {
  onVerify: (status: boolean) => void;
}

const RobotCaptcha: React.FC<RobotCaptchaProps> = ({ onVerify }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [mouseMovements, setMouseMovements] = useState<{ x: number; y: number }[]>([]);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseMovements((prev) => [...prev, { x: event.clientX, y: event.clientY }]);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const validateHuman = () => {
    if (mouseMovements.length > 20) {
      setIsVerified(true);
      onVerify(true);
    } else {
      alert("Hãy di chuột thêm một chút để xác nhận!");
    }
  };
  
  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      custom={2} 
      variants={inputVariants} 
      className="flex items-center gap-3 mt-2 p-4 border rounded-lg shadow-lg w-full bg-white max-w-full"
    >
      <div className="flex items-center gap-2 w-full">
        <div className="relative flex items-center">
          <Checkbox
            checked={isVerified}
            onClick={validateHuman}
            disabled={isVerified}
          />
          {isVerified && (
            <motion.span 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1 text-white text-lg font-bold"
            >✔</motion.span>
          )}
        </div>
        <span className="text-lg font-medium">I'm not a robot</span>
      </div>
      <img src={logo} className="w-10 flex-shrink-0" alt="reCAPTCHA logo" />
    </motion.div>
  );
};

export default RobotCaptcha;
