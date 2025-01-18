import { useVerify } from "@/hooks/useVerify";
export default function VerifyBtn() {
  const { handleVerify, verifyResponse } = useVerify();
  return (
    <>
      <button
        onClick={handleVerify}
        className="w-1/2 rounded-[20px] bg-zinc-900 text-white h-[45px]"
      >
        Verify ID
      </button>
    </>
  );
}
