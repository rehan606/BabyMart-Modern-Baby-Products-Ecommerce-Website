import Footer from "./Footer"
import Header from "./Header"


const CommonLayout = ({children}: {children:React.ReactNode}) => {
  return (
    <div>
      <Header />
      {/* <main>{children}</main> */}
      <Footer />
    </div>
  )
}

export default CommonLayout
