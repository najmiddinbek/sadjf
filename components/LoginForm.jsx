"use client";

import { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import Logtip from "../public/mdn image.png";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  const handleLoading = () => {
    setLoading(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
    } else {
      localStorage.removeItem("rememberMe");
    }

    if (
      (email === "Mashrapov Alijon" && password === "alijon77") ||
      (email === "O`rmanova Yoqutxon" && password === "yoqutxon88") ||
      (email === "Mashrapov Alijon" && password === "alijon77") ||
      (email === "Elyorbek" && password === "elyorbek05") ||
      (email === "Sohibboy" && password === "sohibboy68") ||
      (email === "Boyxanova Muqaddas" && password === "muqaddas09") ||
      (email === "Mashrapov Alijon" && password === "alijonmashrapov") ||
      (email === "Nuriddinova Mohira" && password === "mohira90") ||
      (email === "Otaboyev Botirjon" && password === "otaboyev69") ||
      (email === "Saydullayev Muhammad" && password === "saydullayev45") ||
      (email === "Shojalilova Muyassar" && password === "muyassar111") ||
      (email === "Chinixon" && password === "chinixon108") ||
      (email === "Mamadaliyev Athamjon" && password === "athamjon32") ||
      (email === "Tojiboyeva Tursunoy" && password === "tursunoy22") ||
      (email === "Mahmudov Ikromjon" && password === "ikromjon77") ||
      (email === "Mehmanova Sharipa" && password === "sharipa70") ||
      (email === "Qozaqova Rohathon" && password === "rohathon67") ||
      (email === "Mahkamova Karima" && password === "karima44") ||
      (email === "Islomjon" && password === "islomjon08") ||
      (email === "Mehmanova Zebohon" && password === "zebohon72") ||
      (email === "Abbasova Naima" && password === "naima122") ||
      (email === "Ubayeva Feruza" && password === "ubayevaferuza99") ||
      (email === "Nargiza" && password === "nargiza18") ||
      (email === "Mamurjon" && password === "mamurjon30") ||
      (email === "Muradov Mahmudjon" && password === "mahmudjon25") ||
      (email === "Barchinoy" && password === "barchinoy81") ||
      (email === "Mutalova Yorqinoy" && password === "yorqinoy56") ||
      (email === "Ismailova Gulchehra" && password === "gulchehra100") ||
      (email === "Mamurova Dilfuza" && password === "dilfuza98") ||
      (email === "Parpiyeva Umida" && password === "umida34") ||
      (email === "Xabbayeva Xolida" && password === "xolida65") ||
      (email === "Qirg`izova Xanifa" && password === "xanifa13") ||
      (email === "Ibragimova Rahima" && password === "rahima71") ||
      (email === "Dedaxo`jayeva Gulbahor" && password === "gulbahor88") ||
      (email === "Ahmedova Dilshoda" && password === "dilshoda75") ||
      (email === "Nizamova Mahliyo" && password === "mahliyo16") ||
      (email === "Akbarova Mashhura" && password === "mashhura14") ||
      (email === "Najmiddinova Nasiba" && password === "nasiba11") ||
      (email === "admin" && password === "3-maktab")
    ) {
      router.replace("/pupilsAdd");
      toast.success(`Xush kelibsiz ${email}`, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setLoading(true);
      toast.error(
        `Noto'g'ri malumot kiritildi, Sahifa yangilanishini kuting...`
      );
      setTimeout(() => {
        location.reload();
      }, 5000);
    }
    if (!password) {
      setLoading(false);
      toast.error("Barcha maydonlarni to`ldiring!", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  };

  return (
    <div className="login_form_section">
      <div className="black_element">
        <div className="container mx-auto">
          <div className="login_section flex justify-between items-center h-[100vh]">
            <div
              data-aos="fade-down"
              className="login_section_left w-[50%] border-r-2 mr-10 pr-"
            >
              {/* Saqlangan matnni o'qib olish */}
              <h1 className="xl:text-[45px] hidden md:block login_text  text-white font-[700] leading-[80px] tracking-[2%]">
                Hurmatli foydalanuvchi <br /> Login parolingizni Kiriting.
              </h1>
              <div className="flex justify-center">
                <Image
                  className="login_image -ml-[100px]"
                  src={Logtip}
                  width={600}
                  height={200}
                  alt="Image"
                />
              </div>
            </div>
            <form
              data-aos="fade-up"
              onSubmit={handleSubmit}
              className="login_form flex flex-col rounded-[20px] w-[50%]"
            >
              <h1 className="text-3xl  text-white font-[700] leading-[80px] tracking-[2%]">
                LOGIN BILAN KIRISH
              </h1>
              <p className="text-[17px] text-white poppins-2">
                Maktab mamuryati tomonidan berilgan elektron pochta hamda login
                parolni kiriting
              </p>
              <label className="my-3 text-white text-2xl poppins-2" htmlFor="">
                Elektron pochta
              </label>
              <input
                className="border-2 rounded-md outline-none py-4 px-3"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Elektron pochta kiriting..."
              />
              <label className="my-3 text-white poppins-2 text-2xl" htmlFor="">
                Login parolni kiriting
              </label>
              <input
                className="border-2 rounded-md outline-none py-4 px-3"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Login parolni kiritish..."
              />

              {loading ? (
                <button className="green my-4 rounded-md text-white font-bold cursor-pointer px-6 py-4">
                  Tekshirilmoqda
                </button>
              ) : (
                <button
                  onClick={handleLoading}
                  className="green my-4 rounded-md text-white font-bold cursor-pointer px-6 py-4"
                >
                  Kirish
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
