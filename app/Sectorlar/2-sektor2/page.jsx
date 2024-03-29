'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { CiTextAlignRight } from 'react-icons/ci'
import Navbar from '../../../components/Navbar2'

const getTopics = async () => {
	try {
		const res = await fetch('/api/topics', {
			cache: 'no-store',
		})
		if (!res.ok) {
			throw new Error('Mavzular yuklanmadi')
		}

		return res.json()
	} catch (error) {
		console.log('Mavzular yuklanishda xatolik: ', error)
		return { mavzula: [] }
	}
}

const Filter = () => {
	const [topiclar, setTopiclar] = useState([])
	const [filteredMavzula, setFilteredMavzula] = useState([])
	const [filterValue, setFilterValue] = useState({
		newIsm: '',
		newSinfi: '',
		school: '',
	})
	const [hide, setHide] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const handleHide = () => {
		setHide(!hide)
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true) // Set loading to true when starting to fetch data

				const a = await getTopics()
				const topiclar = a?.topiclar

				const filteredTopics = topiclar.filter(t => t.MFY === '2-sektor')

				setTopiclar(filteredTopics)
				setFilteredMavzula(filteredTopics)
			} catch (error) {
				console.log('Mavzular yuklanishda xatolik: ', error)
				setFilteredMavzula([])
			} finally {
				setIsLoading(false) // Set loading to false after data is fetched
			}
		}

		fetchData()
	}, [])

	const [usersAddedByDate, setUsersAddedByDate] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			const usersGroupedByDate = filteredMavzula.reduce((acc, t) => {
				const dateKey = new Date(t.createdAt).toLocaleDateString()
				acc[dateKey] = acc[dateKey] || []
				acc[dateKey].push(t)
				return acc
			}, {})

			setUsersAddedByDate(usersGroupedByDate)
		}

		fetchData()
	}, [filteredMavzula])

	const handleFilter = () => {
		const filteredArray = topiclar.filter(
			t =>
				t.newIsm.toLowerCase().includes(filterValue.newIsm.toLowerCase()) &&
				t.newSinfi.toLowerCase().includes(filterValue.newSinfi.toLowerCase()) &&
				t.school.toLowerCase().includes(filterValue.school.toLowerCase()) &&
				t.MFY === '2-sektor'
		)

		setFilteredMavzula(filteredArray)
	}

	const getRowBackgroundColor = index => {
		if (index % 2 === 0) {
			return 'bg-white'
		} else if (index % 2 === 1) {
			return 'gray'
		}
	}

	const changeStatus = async id => {
		const confirmed = confirm(
			'Bu o`quvchini dars qoldirish sababi o`rganildimi?'
		)

		if (confirmed) {
			const res = await fetch(`/api/topics?id=${id}`, {
				method: 'PUT',
			})

			if (res.ok) {
				location.reload()
			}
		}
	}

	const [showOrganilgan, setShowOrganilgan] = useState(true)

	const handleOrganilganClick = () => {
		setShowOrganilgan(!showOrganilgan)
	}

	const [filterStatus, setFilterStatus] = useState(null)

	const handleFilterStatus = status => {
		setFilterStatus(status)
	}

	const [clickedNewIsm, setClickedNewIsm] = useState(null)
	const [clickedNewDars, setClickedNewDars] = useState(null)
	const [clickedNewDarsList, setClickedNewDarsList] = useState([])

	const handleClick = newIsm => {
		setClickedNewIsm(newIsm)

		const newDarsList = filteredMavzula
			.filter(t => t.newIsm === newIsm)
			.map(t => parseInt(t.newDarsQoldirish))
			.filter(hours => !isNaN(hours))

		const totalHours = newDarsList.reduce((acc, hours) => acc + hours, 0)

		setClickedNewDarsList({
			list: newDarsList,
			totalHours: totalHours,
		})
		openModal()
	}
	const [showModal, setShowModal] = useState(false)

	const openModal = () => {
		setShowModal(true)
	}

	const closeModal = () => {
		setShowModal(false)
	}

	return (
		<div>
			<Navbar />
			<div className='container'>
				<div className=''>
					<div className='admin_panel_main_div flex justify-between w-full mb-8 items-center'>
						<div>
							<h1 className='admin_panel_text text-4xl mt-3 mb-3 font-bold poppins'>
								Darsga qatnashmagan o`quvchilar
							</h1>
							{showModal && (
								<div className='fixed right-0 flex justify-center items-center min-h-screen blur2 w-full top-0'>
									<div className='flex flex-col text-white'>
										<h1 className='text-center font-bold text-4xl uppercase'>{`${clickedNewIsm} `}</h1>
										<p className='text-2xl mt-3'>
											Dars qoldirgan jami soati: {clickedNewDarsList.totalHours}{' '}
											soat
										</p>
										<div className='flex justify-end'>
											<button
												className='green text-white rounded-md text-xl py-2 px-3'
												onClick={closeModal} // Close the modal when this button is clicked
											>
												Orqaga
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
						{/* <Link href={"/newPupils"}>Bugungi kiritilgan o`quvchilar</Link> */}
						<div className='flex gap-3 items-center katta_main_div_edi'>
							<div
								onClick={handleHide}
								className='main_div_edi  cursor-pointer flex items-center gap-5 font-bold'
							>
								{hide ? (
									<div className='w-8 border-2 py-2.5 flex items-center justify-center rounded-md'>
										<BsChevronUp fontSize={15} />
									</div>
								) : (
									<div className='w-8 border-2 py-2.5 flex items-center justify-center rounded-md'>
										<BsChevronDown fontSize={15} />
									</div>
								)}
							</div>
							<div className='tugmachalar'>
								<Link
									className='simple_button green px-10 py-3 button rounded-md text-white'
									href={'/3-maktab'}
								>
									Barcha o`quvchilar
								</Link>
								<Link
									className='simple_button green px-10 ml-2 py-3 button rounded-md text-white'
									href={'https://www.maktablar-davomat-markazi.uz/2-sektor'}
								>
									Orqaga
								</Link>
							</div>
						</div>
					</div>

					{hide ? (
						<div className=''>
							<div className=''>
								<div className='flex items-center gap-3 my-3'>
									<input
										className='border-2 py-[11px] px-2 w-full'
										placeholder='FIO'
										type='text'
										value={filterValue.newIsm}
										onChange={e =>
											setFilterValue({ ...filterValue, newIsm: e.target.value })
										}
									/>
									<button
										className='green text-white py-3 px-10 button '
										onClick={handleFilter}
									>
										Izlash
									</button>
								</div>
								<div className='flex items-center gap-3'>
									<input
										className='border-2 py-[11px] px-2 w-full mb-2'
										placeholder='Sinfni yozing'
										type='text'
										value={filterValue.newSinfi}
										onChange={e =>
											setFilterValue({
												...filterValue,
												newSinfi: e.target.value,
											})
										}
									/>
									<button
										className='green text-white py-3 px-10 button '
										onClick={handleFilter}
									>
										Izlash
									</button>
								</div>

								<div className='flex items-center gap-3 mb-3'>
									<input
										className='border-2 py-[11px] px-2 w-full'
										placeholder='Maktab raqamini yozing'
										type='text'
										value={filterValue.school}
										onChange={e =>
											setFilterValue({ ...filterValue, school: e.target.value })
										}
									/>
									<button
										className='green text-white py-3 px-10 button '
										onClick={handleFilter}
									>
										Izlash
									</button>
								</div>
							</div>
						</div>
					) : null}
				</div>
				{isLoading ? (
					<div className='flex items-center justify-center h-[60vh]'>
						<span className='loader'></span>
					</div>
				) : (
					<div className='mb-4'>
						{Object.keys(usersAddedByDate)
							.reverse()
							.map(date => (
								<div key={date}>
									<div className='flex gap-2 items-center mt-10 justify-between mb-5'>
										<h3 className='text-2xl font-bold poppins'>
											{date} sanasida kiritilgan o`quvchilar:
										</h3>
										<div className='flex gap-2'>
											<Link
												href={'/SuperAdmin'}
												className='green text-white flex justify-center items-center rounded-md cursor-pointer px-2'
											>
												Admin Panel
											</Link>
											<button
												className={`${
													filterStatus === true ? 'green' : 'green'
												} text-white px-4 py-2 rounded-md cursor-pointer`}
												onClick={() => handleFilterStatus(true)}
											>
												O`rganilgan
											</button>
											<button
												className={`${
													filterStatus === false ? 'bg-red-700' : 'bg-red-700'
												} text-white px-4 py-2 rounded-md cursor-pointer`}
												onClick={() => handleFilterStatus(false)}
											>
												O`rganilmagan
											</button>
										</div>
									</div>

									<table className='main_table w-full shadow-xl'>
										<thead className='green text-white font-bold poppins-2'>
											<tr>
												<th className='admin_panel_th admin_panel-tih py-5 px-2 poppins-2'>
													№
												</th>
												<th className='admin_panel_th py-4 px-2 poppins-2'>
													Ism
												</th>
												<th className='admin_panel_th py-4 px-2 poppins-2'>
													Telefon raqami
												</th>
												<th className='admin_panel_th py-4 px-2 poppins-2'>
													Maktab
												</th>
												<th className='admin_panel_th py-4 px-2 poppins-2'>
													Sinf
												</th>
												<th className='admin_panel_th py-4 px-2 poppins-2'>
													Sektor
												</th>
												<th className='admin_panel_th py-4 px-2 poppins-2'>
													Yashash manzili
												</th>
												<th className='admin_panel_th py-4 px-2 poppins-2'>
													Kiritilgan vaqti
												</th>
												<th className='admin_panel_th py-4 px-2 poppins-2'>
													Qoldirgan dars vaqti
												</th>
												<th className='admin_panel_th py-4 px-2 poppins-2'></th>
												<th className='admin_panel_th py-4 px-2 poppins-2'></th>
												<th className='admin_panel_th py-4 px-2 poppins-2'></th>
											</tr>
										</thead>
										{usersAddedByDate[date]
											.filter(t =>
												filterStatus === null
													? true
													: t.isChecked === filterStatus
											)
											.map((t, index) => (
												<tbody key={t.id} className='text-center w-full'>
													<tr
														className={`${getRowBackgroundColor(index)} w-full`}
													>
														<td className='px-2 py-4 admin_panel_td admin_panel-tih admin_panel_index '>
															{index + 1}
														</td>
														<td className='px-2 py-4 admin_panel_td'>
															{t.newIsm}
														</td>
														<td className='px-2 py-4 admin_panel_td'>
															{t.telephoneRaqami}
														</td>
														<td className='px-2 py-4 admin_panel_td'>
															{t.school}
														</td>
														<td className='admin_panel_td'>{t.newSinfi}</td>
														<td className='px-2 py-4 admin_panel_td'>
															{t.MFY}
														</td>
														<td className='px-2 py-4 admin_panel_td'>
															{t.manzili}
														</td>
														<td className='px-2 py-4 admin_panel_td'>
															{new Date(t.createdAt).toLocaleString()}
														</td>
														<td className='px-2 py-4 admin_panel_td'>
															{t.newDarsQoldirish}
														</td>
														<td>
															<button
																onClick={() => changeStatus(t._id)}
																className={`py-2 ml-2 px-2 ${
																	t.isChecked
																		? 'text-white green rounded-md cursor-pointer'
																		: 'text-white bg-red-700 rounded-md cursor-pointer'
																}`}
															>
																{t.isChecked ? "O'rganilgan" : "O'rganilmagan"}
															</button>
														</td>
														<td>
															<CiTextAlignRight
																className='text-4xl cursor-pointer'
																onClick={() =>
																	handleClick(t.newIsm, t.newDarsQoldirish)
																}
															/>
														</td>
													</tr>
												</tbody>
											))}
									</table>
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Filter
