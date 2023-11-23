import Filter from "../../components/Filter"
import Navbar from "../../components/Navbar2"

export default function TopicsList() {

    return (
        <>
            <Navbar />
            <div className="container">
                <Filter />
            </div >
        </>
    );
}