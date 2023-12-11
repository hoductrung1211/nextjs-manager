'use client';
import Image from "next/image";
import loginImgSrc from "@/app/assets/login_02.png";
import userImgSrc from "@/app/assets/account_01.png";
import { HTMLInputTypeAttribute,  useEffect,  useState } from "react";
import Link from "next/link";
import { Button, Checkbox, FormControl, FormControlLabel, TextField } from "@mui/material";
import { login } from "@/apis/auth/auth";
import useAlert from "@/hooks/useAlert";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import Logo from "@/components/logo/Logo";

export default function Login() {
    localStorage.clear();

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
      <div className="grid place-items-center h-screen ">
          <div className="container flex rounded-lg overflow-hidden shadow-md">
              <section className="w-8/12 p-5 flex flex-col bg-grey">
                  <span className="">
                      <Logo />
                  </span>
                  <Image
                      src={loginImgSrc}
                      alt=""
                  />
                  <p className="text-sm text-end">Copyright © 2023 TeS Inc. All rights reserved.</p>
              </section>
              <LoginSection />
          </div>
      </div>
  )
}

function LoginSection() { 
    const [isRemembered, setIsRemembered] = useState(false);
    const router = useRouter();
    const [inputs, setInputs] = useState<{ [key: string]: { label: string, value: string, type: HTMLInputTypeAttribute } }>({
        "username": {
            label: "Tên đăng nhập",
            value: "hoductrung",
            type: "text"
        },
        "password": {
            label: "Mật khẩu",
            value: "Password@123",
            type: "password",
        }
    })
    const setAlert = useAlert();
    const setLoading = useLoadingAnimation();

    async function handleLogin() {
        const isValidated = validateLogin({
            username: inputs['username'].value,
            password: inputs['password'].value
        });
        
        if (!isValidated)
            return;

        try {
            setLoading(true);
            
            const { data: {
                accessToken,
                refreshToken,
                fullName,
                role,
            }} = await login({
                username: inputs['username'].value,
                password: inputs['password'].value,
            });
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('fullName', fullName);
            localStorage.setItem('role', role);
            setAlert({
                severity: "success",
                message: "Đăng nhập thành công!"
            });
            router.push("/recruitments");
        }
        catch (error) {
            if (isAxiosError(error)) {
                setAlert({
                    severity: "error",
                    message: "Đăng nhập thất bại! Làm ơn thử lại."
                });
                console.log(error.message);
            }
            
        }
        finally {
            setLoading(false);
        }
    }
 
    return (
        <section className="w-5/12 p-10 flex flex-col gap-14">
            <h2 className="flex flex-col items-center gap-4 text-2xl text-center font-semibold">
                Login
                <div className="w-28 ">
                    <Image
                        className="w-full"
                        src={userImgSrc}
                        alt="user login"
                    />
                </div>
            </h2>
            <FormControl className="flex flex-col gap-4 ">
                {
                    Object.keys(inputs).map((key: string) => (
                        <TextField 
                            key={key}
                            fullWidth
                            variant="outlined"
                            {...inputs[key]}
                            onChange={e => {
                                setInputs({
                                    ...inputs,
                                    [key]: {
                                        ...inputs[key],
                                        value: e.target.value
                                    }
                                })
                            }}
                        />
                    ))
                }
                <div className="mt-2 flex items-center justify-between">
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Nhớ mật khẩu"
                        value={isRemembered}
                        onChange={() => setIsRemembered(!isRemembered)}
                    />
                    <Link className="underline text-blue-400" href={""}>Quên mật khẩu</Link>
                </div>
            </FormControl>
            <section className="mt-auto flex flex-col gap-6 ">
                <Button
                    color="primary"
                    sx={{
                        "color": "white"
                    }}
                    className="h-12 font-bold text-md bg-green-sea"
                    variant="contained"
                    onClick={handleLogin}
                >Đăng nhập</Button>
            </section>
        </section>
    )
}

function validateLogin({

}: {
    username: string,
    password: string,
}) {
    return true;
}