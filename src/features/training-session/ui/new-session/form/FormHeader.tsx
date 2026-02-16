interface FormHeaderProps {
  closeModal: VoidFunction;
}

const FormHeader = ({ closeModal }: FormHeaderProps) => {
  return (
    <div className="py-1 ">
      <div className="flex gap-4 px-4">
        <div className="shadow-2xl rounded-lg flex items-center justify-center border border-shadowGray w-fit p-3">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 448 512" className="text-offWhite">
            <path d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm64 64v64h64V96h64v64h64V96h64v64h-64v64h64v64h-64v64h64v64h-64v-64h-64v64h-64v-64h-64v64H64v-64h64v-64H64v-64h64v-64H64V96h64zm64 128h64v-64h-64v64zm0 64v-64h-64v64h64zm64 0h-64v64h64v-64zm0 0h64v-64h-64v64z" />
          </svg>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full">
            <h1 className="text-lg font-semibold">Training session form</h1>
            <button onClick={closeModal} className="my-auto">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 512 512" className="my-auto">
                <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z" />
              </svg>
            </button>
          </div>
          <p className="text-muted text-xs text-red-500">Note: Only analyzed games are included</p>
        </div>
      </div>
      <div className="pt-5">
        <div className="w-full h-[1.5px]" />
      </div>
    </div>
  );
};

export default FormHeader;