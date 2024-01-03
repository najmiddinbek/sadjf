'use client'

import React, { useState, useEffect } from 'react';

const getTopics = async () => {
    try {
        const res = await fetch('/api/topics', {
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error('Mavzular yuklanmadi');
        }

        return res.json();
    } catch (error) {
        console.log('Mavzular yuklanishda xatolik: ', error);
        return { mavzula: [] };
    }
};


const App = () => {
    const [topiclar, setTopiclar] = useState([]);
    const [filteredMavzula, setFilteredMavzula] = useState([]);
    const [filterValue, setFilterValue] = useState({ newIsm: "", newSinfi: "", school: "" });
    const [hide, setHide] = useState(false)



    const handleHide = () => {
        setHide(!hide)
    }




    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];

            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);
        };

        fetchData();
    }, []);

    const [usersAddedByDate, setUsersAddedByDate] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const usersGroupedByDate = filteredMavzula.reduce((acc, t) => {
                const dateKey = new Date(t.createdAt).toLocaleDateString();
                acc[dateKey] = (acc[dateKey] || 0) + 1;
                return acc;
            }, {});

            setUsersAddedByDate(usersGroupedByDate);
        };

        fetchData();
    }, [filteredMavzula]);

    const [percentageIncreaseByDate, setPercentageIncreaseByDate] = useState({});

    useEffect(() => {
        const calculatePercentageIncrease = () => {
            const dates = Object.keys(usersAddedByDate);
            const percentageIncrease = {};

            for (let i = 1; i < dates.length; i++) {
                const currentDate = dates[i];
                const previousDate = dates[i - 1];

                const currentCount = usersAddedByDate[currentDate];
                const previousCount = usersAddedByDate[previousDate];

                const increasePercentage = ((currentCount - previousCount) / previousCount) * 100;

                percentageIncrease[currentDate] = increasePercentage.toFixed(2);
            }

            setPercentageIncreaseByDate(percentageIncrease);
        };

        calculatePercentageIncrease();
    }, [usersAddedByDate]);

    const [countSababli, setCountSababli] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];

            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);
            const sababliCount = filteredTopics.filter((t) => t.newDarsQoldirish === "Sababli").length;
            setCountSababli(sababliCount);
        };

        fetchData();
    }, []);

    const [countNotSababli, setCountNotSababli] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];

            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);
            const notSababliCount = filteredTopics.filter((t) => t.newDarsQoldirish !== "Sababli").length;
            setCountNotSababli(notSababliCount);
        };

        fetchData();
    }, []);

    const [percentageSababli, setPercentageSababli] = useState(0);
    const [percentageNotSababli, setPercentageNotSababli] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];


            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);

            // Calculate percentage of items where newDarsQoldirish === "Sababli"
            const sababliCount = filteredTopics.filter((t) => t.newDarsQoldirish === "Sababli").length;
            const sababliPercentage = (sababliCount / filteredTopics.length) * 100;
            setPercentageSababli(sababliPercentage.toFixed(2));

            // Calculate percentage of items where newDarsQoldirish !== "Sababli"
            const notSababliCount = filteredTopics.filter((t) => t.newDarsQoldirish !== "Sababli").length;
            const notSababliPercentage = (notSababliCount / filteredTopics.length) * 100;
            setPercentageNotSababli(notSababliPercentage.toFixed(2));
        };

        fetchData();
    }, []);





    // useEffect(() => {
    //     const fetchData = async () => {
    //         const a = await getTopics();
    //         const topiclar = a?.topiclar;

    //         const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];

    //         setTopiclar(filteredTopics);
    //         setFilteredMavzula(filteredTopics);
    //         const usersGroupedByDate = filteredTopics.reduce((acc, t) => {
    //             const dateKey = new Date(t.createdAt).toLocaleDateString();
    //             acc[dateKey] = (acc[dateKey] || 0) + 1;
    //             return acc;
    //         }, {});

    //         setUsersAddedByDate(usersGroupedByDate);
    //     };

    //     fetchData();
    // }, [filteredMavzula]);





    return (
        <div className="container">
            <div className="flex flex-col justify-start w-full">
                <h2 className="text-3xl text-white font-bold mb-2">Foizdagi o`zgarish</h2>
                {Object.keys(percentageIncreaseByDate).map((date, index) => (
                    <p className='text-white' key={date}>
                        {date}: {index > 0 ? "Avvalgi kundan farqi " : ""}{percentageIncreaseByDate[date]}%
                    </p>
                ))}
            </div>
            <div className="mb-4">
                <h2 className="text-3xl text-white font-bold mb-2">Sababli dars qoldirilgan o`quvchilar</h2>
                <p className='text-white'>{countSababli} ta o`quvchi sababli dars qoldirgan</p>
                <p className='text-white'>Bu barcha oquvchilarning <b>{percentageSababli}%</b> ni tashkil etadi</p>
            </div>
        </div>
    );
};

export default App;
