


export const AdminPanel = () => {
  return (
    <div className='grid grid-cols-2 gap-4 h-full'  >
        
        <div className='border-2 border-gray-800 p-4  rounded-2xl w-full flex justify-center align-center cursor-pointer'>
            <div className='flex flex-col gap-10 justify-center items-center'>
            <h1 className='text-5xl'> Total Task </h1>
            <p className='font-extrabold text-6xl '> 25</p>
            </div>
        </div>
        <div className='border-2 border-gray-800 p-4  rounded-2xl  w-full flex justify-center align-center cursor-pointer'>
            <div className='flex flex-col gap-10 justify-center items-center'>
            <h1 className='text-5xl'> Completed Task </h1>
            <p className='font-extrabold text-6xl text-teal-500'> 15</p>
            </div>
        </div>
        <div className='border-2 border-gray-800 p-4  rounded-2xl  w-full flex justify-center align-center cursor-pointer'>
            <div className='flex flex-col gap-10 justify-center items-center'>
            <h1 className='text-5xl'> Pending Task </h1>
            <p className='font-extrabold text-6xl text-red-500 '> 25</p>
            </div>
        </div>
        <div className='border-2 border-gray-800 p-4  rounded-2xl w-full flex justify-center align-center   '>
            <div className='flex flex-col gap-10 justify-center items-center'>
            <h1 className='text-5xl'> InProgess Task </h1>
            <p className='font-extrabold text-6xl text-blue-500'> 25</p>
            </div>
        </div>
        
    
    </div>
  )
}
