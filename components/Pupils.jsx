'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CgDanger } from 'react-icons/cg'
import { toast } from 'react-toastify'
import ITLOGO from '../public/Logo_IT_Park_Uzbekistan.svg.png'
import FilterOption from './FilterOption'
const PupilsAddClient = () => {
	const [shaxs, setShaxs] = useState('')
	const [maktab, setMaktab] = useState('')
	const [sinf, setSinfi] = useState('')
	const [pupil, setPupil] = useState('')
	const [dars, setDars] = useState('')
	const [school, setSchool] = useState('3')
	const [newSinfi, setNewSinfi] = useState('')
	const [newDarsQoldirish, setNewDarsQoldirish] = useState('')
	const [telephoneRaqami, setTelephoneRaqami] = useState('')
	const [newIsm, setNewIsm] = useState('')
	const [setShaxsi, setSetShaxsi] = useState('')
	const [MFY, setMFY] = useState('2')
	const [manzili, setManzili] = useState('')
	const [telefoni, setTelefoni] = useState('')
	const [organildi, setOrganildi] = useState('')

	const router = useRouter()

	const maktablar = Array.from({ length: 54 }, (_, index) => index + 1)
	const kun = Array.from({ length: 3 }, (_, index) => index + 1)
	const soat = Array.from({ length: 6 }, (_, index) => index + 1)
	const sinflar = Array.from({ length: 11 }, (_, index) => index + 1)

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const res = await fetch(`/api/topics`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					shaxs,
					maktab,
					sinf,
					pupil,
					dars,
					school,
					newSinfi,
					newDarsQoldirish,
					telephoneRaqami,
					newIsm,
					setShaxsi,
					MFY,
					manzili,
					organildi,
				}),
			})

			if (res.ok) {
				const form = e.target
				form.reset()
				router.push('/pupilsAdd')
				toast.success('O`quvchi malumotlari muvaffaqiyatli qo`shildi!', {
					position: 'top-center',
					autoClose: 10000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				})
				const response = await fetch('/api/topics')
				if (response.ok) {
					const data = await response.json()
					setTopicCount(data.length)
				} else {
					console.log('Failed to fetch topic data.')
				}
			} else {
				console.log('User registration failed.')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='w-full flex flex-col h-[85vh] gap-3 main_form_add'
			>
				<div className='block md:flex items-center justify-between'>
					<div className='text-white uppercase text-[12px] md:text-xl font-bold flex gap-2 items-start '>
						<CgDanger className='text-5xl  text-red-400 cursor-pointer animation-icon' />
						2-sektor 3-maktab ga tegishli o`quvchilarning malumotlari!
					</div>
				</div>
				<>
					<label
						className='text-[13px] font-bold poppins-2 text-white -mb-3'
						htmlFor=''
					>
						Sinfni tanlang
					</label>

					<FilterOption
						setShaxsiy={setNewSinfi}
						setSetShaxs={setNewIsm}
						setManzili={setManzili}
						setTelefoni={setTelephoneRaqami}
						newDarsQoldirish={newDarsQoldirish}
						setNewDarsQoldirish={setNewDarsQoldirish}
					/>
					<label
						className='text-[13px] font-bold poppins-2 text-white -mb-3'
						htmlFor=''
					>
						Qoldirilgan dars vaqti
					</label>
					<select
						onChange={e => setNewDarsQoldirish(e.target.value)}
						value={newDarsQoldirish}
						className='px-2 py-3 border text-[13px] text-opacity-25 outline-none rounded-md cursor-pointer'
					>
						<option>Bu yerdan tanlang</option>
						<option>Sababli</option>

						{soat.map((watch, index) => (
							<option key={index}>{watch}-soat</option>
						))}
					</select>

					{newDarsQoldirish === '' && (
						<div className='flex justify-end'>
							<button
								type='submit'
								disabled={newDarsQoldirish === ''}
								className='bg-white border-2 cursor-no-drop rounded-md font-bold text-gray-200 py-3 px-6 w-fit'
							>
								Qo`shish
							</button>
						</div>
					)}
					{newDarsQoldirish !== '' && (
						<div className='flex justify-end'>
							<button
								type='submit'
								className='green border-2 cursor-pointer rounded-md font-bold text-gray-200 py-3 px-6 w-fit'
							>
								Qo`shish
							</button>
						</div>
					)}
				</>
				<div className='anons flex gap-1 md:mt-10  justify-center'>
					<h1 className='text-center text-[16px] poppins-2 text-white'>
						Web Sayt Chortoq IT Park jamoasi tomonidan tuzildi
						<Link href={'https://t.me/Sarvarr_dev'}> Murojaat uchun</Link>
					</h1>
					<Image
						src={ITLOGO}
						className='flex justify-center'
						alt='Image'
						width={50}
						height={10}
					/>
				</div>
			</form>
		</>
	)
}

export default PupilsAddClient
