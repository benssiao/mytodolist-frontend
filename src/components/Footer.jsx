function Footer() {
  return (
    <footer className="justify-end flex flex-col items-center gap-10 text-black p-4 text-center  bg-[#119DA4]">
      <hr className="w-1/2 border-black"></hr>
      <p className="text-sm">
        © {new Date().getFullYear()} Ben's Todo List. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
