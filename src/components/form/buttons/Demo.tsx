const DemoButton = () => {
  return (
    <button className="relative inline-flex whitespace-nowrap h-fit w-[45%] sm:w-[35%] items-center justify-center rounded-lg text-white shadow-xs px-[calc(theme(spacing[5])-1px)] py-[calc(theme(spacing[3])-1px)]  cursor-pointer bg-[#ffffff12] transition duration-150 ">
            <div className="inline-flex items-center font-bold gap-2 ">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M464 256a208 208 0 1 0-416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1-512 0zm188.3-108.9c7.6-4.2 16.8-4.1 24.3.5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3.5S176 352.9 176 344.2v-176c0-8.7 4.7-16.7 12.3-20.9z" />
              </svg>
              Watch demo
            </div>
          </button>
  )
}

export default DemoButton;
