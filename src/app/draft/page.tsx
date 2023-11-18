'use client';

import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import { Button } from "@mui/material";

export default function Page() {
  const setLoading = useLoadingAnimation();

  const handleClick = () => {
    setLoading(true);
  }

  return (
    <div className="w-52 h-52 bg-slate-100">
      <Button onClick={handleClick}>Click me</Button>
    </div>
  )
}
 