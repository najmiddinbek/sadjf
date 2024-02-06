import Image from 'next/image'
import Logotip from '../public/mdn (2) image 2.png'

export default function Navbar() {
	return (
		<div className=''>
			<div className='max-w-[2000px]  mx-auto'>
				<nav className='flex justify-center green items-center'>
					<Image
						className='w-[150px] md:w-[250px]'
						src={Logotip}
						height={100}
						alt='
                    Image'
					/>
				</nav>
			</div>
		</div>
	)
}
