'use client'

import React, { useState, useEffect } from 'react';
import { LuArrowDownSquare } from "react-icons/lu";
import { BsArrowUpSquare } from "react-icons/bs";

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


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const a = await getTopics();
                const topiclar = a?.topiclar;

                const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];

                setTopiclar(filteredTopics);
                setFilteredMavzula(filteredTopics);
            } catch (error) {
                console.log('Mavzular yuklanishda xatolik: ', error);
            } finally {
                setLoading(false);
            }
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
            const sababliCount = filteredTopics.filter((t) => t.newDarsQoldirish === "Sababli").length;
            const sababliPercentage = (sababliCount / filteredTopics.length) * 100;
            setPercentageSababli(sababliPercentage.toFixed(2));
            const notSababliCount = filteredTopics.filter((t) => t.newDarsQoldirish !== "Sababli").length;
            const notSababliPercentage = (notSababliCount / filteredTopics.length) * 100;
            setPercentageNotSababli(notSababliPercentage.toFixed(2));
        };

        fetchData();
    }, []);

    const [highSumIsmList, setHighSumIsmList] = useState([]);
    const [sumDarsQoldirishByIsm, setSumDarsQoldirishByIsm] = useState({});

    useEffect(() => {
        const calculateSumDarsQoldirishByIsm = () => {
            const sumByIsm = {};

            filteredMavzula.forEach((t) => {
                const { newIsm, newDarsQoldirish } = t;
                sumByIsm[newIsm] = (sumByIsm[newIsm] || 0) + parseInt(newDarsQoldirish, 10);
            });

            setSumDarsQoldirishByIsm(sumByIsm);
        };

        calculateSumDarsQoldirishByIsm();
    }, [filteredMavzula]);


    useEffect(() => {
        const filterHighSumIsmList = () => {
            const isms = Object.keys(sumDarsQoldirishByIsm);
            const highSumIsmList = isms
                .filter((ism) => sumDarsQoldirishByIsm[ism] > 20)
                .map((ism) => ({
                    newIsm: ism,
                    newSinfi: filteredMavzula.find((item) => item.newIsm === ism)?.newSinfi || "Unknown",
                }));
            setHighSumIsmList(highSumIsmList);
        };

        filterHighSumIsmList();
    }, [sumDarsQoldirishByIsm, filteredMavzula]);
    const itemsPerPageGroup = 10;
    const numberOfGroups = Math.ceil(highSumIsmList.length / itemsPerPageGroup);
    const [currentGroup, setCurrentGroup] = useState(1);

    const paginateGroup = (array, pageSize, groupNumber) => {
        const startIndex = (groupNumber - 1) * pageSize;
        const endIndex = Math.min(groupNumber * pageSize, array.length);
        return array.slice(startIndex, endIndex);
    };

    const paginatedHighSumIsmList = paginateGroup(highSumIsmList, itemsPerPageGroup, currentGroup);

    const handleGroupChange = (group) => {
        setCurrentGroup(group);
    };

    const itemsPerPageGroupPercentage = 10;
    const numberOfGroupsPercentage = Math.ceil(Object.keys(percentageIncreaseByDate).length / itemsPerPageGroupPercentage);
    const [currentGroupPercentage, setCurrentGroupPercentage] = useState(1);

    const paginateGroupPercentage = (obj, pageSize, groupNumber) => {
        const keys = Object.keys(obj);
        const startIndex = (groupNumber - 1) * pageSize;
        const endIndex = Math.min(groupNumber * pageSize, keys.length);
        const result = {};
        for (let i = startIndex; i < endIndex; i++) {
            const key = keys[i];
            result[key] = obj[key];
        }
        return result;
    };

    const paginatedPercentageIncreaseByDate = paginateGroupPercentage(
        percentageIncreaseByDate,
        itemsPerPageGroupPercentage,
        currentGroupPercentage
    );

    const handleGroupChangePercentage = (group) => {
        setCurrentGroupPercentage(group);
    };

    if (loading) {
        return <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='text-white text-3xl uppercase mb-4'>
                Yuklanmoqda...
            </h1>
            <span class="loader2"></span>
        </div>;
    }


    return (
        <div className="container">
            <div className="flex flex-col justify-start w-full">
                <h2 className="text-3xl text-white font-bold mb-4 text-center uppercase">Foizdagi o`zgarish</h2>
                {Object.keys(paginatedPercentageIncreaseByDate).map((date, index) => (
                    <div
                        className='text-black bg-white py-3 rounded-md mb-2 flex justify-between items-center px-5'
                        key={date}
                    >
                        <div>
                            <p className='text-xl text-red-500 font-bold'>{date}:</p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            {paginatedPercentageIncreaseByDate[date]}%
                            {index > 0 ? (
                                <>
                                    {paginatedPercentageIncreaseByDate[date] < 0 ? (
                                        <LuArrowDownSquare className='text-green-500 text-3xl' />
                                    ) : (
                                        <BsArrowUpSquare className='text-red-600 text-3xl' />
                                    )}
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                ))}
                {numberOfGroupsPercentage > 1 && (
                    <div className="flex justify-center mt-4">
                        {[...Array(numberOfGroupsPercentage)].map((_, index) => (
                            <button
                                key={index}
                                className={`px-5 py-3 text-black mx-2 rounded-md ${currentGroupPercentage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700'
                                    }`}
                                onClick={() => handleGroupChangePercentage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col">
                <div className="mb-4">
                    <h2 className="text-3xl text-white font-bold my-4 text-center uppercase">20 soatdan kop dars qoldirgan `oquvchilar</h2>
                    {paginatedHighSumIsmList.map((item, index) => (
                        <li className="bg-white list-none mb-3 shadow-xl py-3 px-2 text-black rounded-md" key={index}>
                            ({index + 1 + itemsPerPageGroup * (currentGroup - 1)}) {item.newIsm} - {item.newSinfi}:
                            <span className='text-red-500 ml-2 font-bold '>
                                Jami {sumDarsQoldirishByIsm[item.newIsm]} soat dars qoldirgan
                            </span>
                        </li>
                    ))}
                    {numberOfGroups > 1 && (
                        <div className="flex justify-center mt-4">
                            {[...Array(numberOfGroups)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`px-5 py-3 text-black mx-2 rounded-md ${currentGroup === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                                        }`}
                                    onClick={() => handleGroupChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;