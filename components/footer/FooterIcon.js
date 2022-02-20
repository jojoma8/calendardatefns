function FooterIcon({ Icon, active }) {
  return (
    <div
      className="flex items-center cursor-pointer 
            px-6 sm:h-14 
           rounded-xl active:border-b-2 
           "
      // onClick={() => setNewPostModal(true)}
    >
      <Icon
        className={` text-blue-550 text-center h-4 w-4
            mx-auto  ${active && "text-blue-500"}`}
      />
    </div>
  );
}

export default FooterIcon;
