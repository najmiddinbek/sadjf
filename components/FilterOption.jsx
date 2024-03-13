'use client'

import { useEffect, useState } from 'react'
const getTopics = async () => {
	try {
		const res = await fetch(`/api/pupils`, {
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

export default function FilterOption({
	setShaxsiy,
	setSetShaxs,
	setManzili,
	setTelefoni,
	telefoni,
	newDarsQoldirish,
}) {
	const [mavzula, setMavzula] = useState([])
	const [selectedOption, setSelectedOption] = useState('')
	const [selectedName, setOptionName] = useState('')
	const [selectedAddress, setSelectedAddress] = useState('')
	const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('')
	const [selectedTelephoneNumber, setSelectedTelephoneNumber] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const topiclar = await getTopics()
				setMavzula(topiclar.mavzula)
			} catch (error) {
				console.log('Mavzular yuklanishda xatolik: ', error)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		if (selectedOption && selectedName !== '') {
			const selectedPerson = mavzula.find(
				mavzu =>
					mavzu.sinf === parseInt(selectedOption) &&
					mavzu.shaxs === selectedName
			)

			if (selectedPerson) {
				setSelectedAddress(selectedPerson.adress)
				setSelectedPhoneNumber(selectedPerson.YangiTelefonRaqamiUser)
			} else {
				setSelectedAddress('')
				setSelectedPhoneNumber('')
			}
		}
	}, [selectedOption, selectedName, mavzula])

	const handleOptionChange = e => {
		const selectedGrade = e.target.value
		setSelectedOption(selectedGrade)
		setShaxsiy(selectedGrade)
		setOptionName('')
		setSelectedAddress('')
	}

	const yangiIsm = e => {
		const selectedNamesi = e.target.value
		setOptionName(selectedNamesi)
		setSetShaxs(selectedNamesi)
	}
	const handleAddressChange = e => {
		const newValue = e.target.value

		const selectedPerson = mavzula.find(
			mavzu =>
				mavzu.sinf === parseInt(selectedOption) && mavzu.shaxs === selectedName
		)

		if (selectedPerson) {
			setManzili(selectedPerson.adress)
		} else {
			setManzili(newValue)
		}
	}

	const handleTelefonChange = e => {
		const newValue2 = e.target.value

		const selectedPerson = mavzula.find(
			mavzu =>
				mavzu.sinf === parseInt(selectedOption) && mavzu.shaxs === selectedName
		)

		if (selectedPerson) {
			setTelefoni(selectedPerson.YangiTelefonRaqamiUser)
			setSelectedTelephoneNumber(selectedPerson.YangiTelefonRaqamiUser)
		} else {
			setTelefoni(newValue2)
			setSelectedTelephoneNumber(newValue2)
		}
	}
	useEffect(() => {
		const fetchData2 = async () => {
			try {
				if (selectedTelephoneNumber && selectedName && newDarsQoldirish) {
					const response = await fetch(`
					https://smsapp.uz/new/services/send.php?key=155e4cdd9e529617123e2630dc863875274cf4b6&number=%2B998${selectedTelephoneNumber}&message=Фарзандингиз+${selectedName}+бугун+${newDarsQoldirish}+соат+дарс+колдирди.+Фарзандига+таьлим+бериш+мажбуриятини+бажармаслик+маьмурий+жавобгарликка+сабаб+булади.&devices=%5B%221161%7C0%22%2C%221161%7C1%22%5D&type=sms&prioritize=0
										`)

					if (response.ok) {
						const data = await response.json()
						console.log(data)
					} else {
						console.error('Error fetching data')
					}
				} else {
					console.error(
						'Selected telephone number, name, or newDarsQoldirish is empty'
					)
				}
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		if (selectedTelephoneNumber && selectedName && newDarsQoldirish) {
			const timeout = setTimeout(() => {
				fetchData2()
			}, 1000)

			return () => clearTimeout(timeout)
		}

		return () => {} // No timeout if the conditions are not met
	}, [selectedTelephoneNumber, selectedName, newDarsQoldirish])

	return (
		<div>
			<select
				className='px-2 py-3 mb-3  w-full  border  text-opacity-25 outline-none rounded-md cursor-pointer'
				value={selectedOption}
				onChange={handleOptionChange}
			>
				<option>Bu yerdan tanlang</option>
				<option>5-A</option>
				<option>5-B</option>
				<option>5-D</option>
				<option>5-E</option>
				<option>6-A</option>
				<option>6-B</option>
				<option>6-D</option>
				<option>6-E</option>
				<option>7-A</option>
				<option>7-B</option>
				<option>7-D</option>
				<option>7-E</option>
				<option>8-A</option>
				<option>8-B</option>
				<option>8-D</option>
				<option>8-E</option>
				<option>9-A</option>
				<option>9-B</option>
				<option>9-D</option>
				<option>9-E</option>
				<option>10-A</option>
				<option>10-B</option>
				<option>10-D</option>
				<option>10-E</option>
				<option>11-A</option>
				<option>11-B</option>
				<option>11-D</option>
			</select>
			<div className='gap-4'>
				<label
					className='mb-1 text-[13px] poppins-2 text-white font-bold  '
					htmlFor=''
				>
					Familiya, Ismi hamda Otasining ismi
				</label>
				<select
					className='w-full text-[13px] p-3 mb-4 border  text-opacity-25 outline-none rounded-md cursor-pointer'
					value={selectedName}
					onChange={yangiIsm}
				>
					<option value=''>Tanlang</option>
					{mavzula
						.filter(mavzu => mavzu.sinf === selectedOption)
						.map((mavzu, index) => (
							<option className='' key={index} value={mavzu.shaxs}>
								{mavzu.shaxs}
							</option>
						))}
				</select>

				<label className='-mb-4 text-[13px] poppins-2 text-white font-bold'>
					Yashash manzili
				</label>
				<select
					className='w-full text-[13px] p-3 mb-3 border rounded-md'
					onChange={handleAddressChange}
				>
					<option>Tanlang</option>
					{mavzula
						.filter(mavzu => mavzu.shaxs === selectedName)
						.map((mavzu, index) => (
							<option key={index} value={mavzu.adress}>
								{mavzu.adress}
							</option>
						))}
				</select>

				<label className='-mb-4 text-[13px] poppins-2 text-white font-bold'>
					Telefon raqami
				</label>

				<select
					className='w-full text-[13px] text-black p-3 border rounded-md'
					onChange={handleTelefonChange}
				>
					<option value=''>Tanlang</option>
					{mavzula
						.filter(mavzu => mavzu.shaxs === selectedName)
						.map((mavzu, index) => (
							<option key={index} value={mavzu.YangiTelefonRaqamiUser}>
								{mavzu.YangiTelefonRaqamiUser}
							</option>
						))}
				</select>
			</div>
		</div>
	)
}
