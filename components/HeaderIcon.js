function HeaderIcon({ Icon, active, width = 7 }) {
  return (
    <div
      className="flex items-center cursor-pointer md:px-2 lg:px-4 sm:h-14 
        md:hover:bg-gray-100 rounded-xl active:border-b-2 
        active:border-blue-500 group "
      // onClick={() => setNewPostModal(true)}
    >
      <Icon
        className={`h-7 text-gray-500 text-center sm:h-7 sm:w-${width}
          mx-auto group-hover:text-blue-500 ${active && "text-blue-500"}`}
      />
    </div>
  );
}

export default HeaderIcon;
