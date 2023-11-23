'use client'
import PupilsAddClient from "../../components/Pupils";
import Navbar from "../../components/Navbar";


const PupilsAddPage = () => {
    return (
        <div className="login_form_section_2">
            <div className="section">
                <Navbar />
                <div className='container z-50 w-full mx-auto flex justify-center items-center h-[85vh]'>
                    <PupilsAddClient />
                </div>
            </div>
        </div>
    );
};

export default PupilsAddPage;