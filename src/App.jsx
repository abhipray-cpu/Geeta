import { RouterProvider,createBrowserRouter } from "react-router-dom";

import Landing,{loader as landingLoader} from './pages/Landing'
import Chapter from './pages/Chapter'
import Shlok from './pages/Shlok'

const router = createBrowserRouter(
    [
        {
            path:'/',
            element:<Landing></Landing>,
            loader:landingLoader,
            id:'home',
            index:true,
           
        },{
            path:'/chapter/:chapter',
            element:<Chapter></Chapter>,
            id:'chapter',
        },{
            path:'/sholk/:sholk',
            element:<Shlok></Shlok>,
            id:"shlok"
        }
    ]
)
function App(){
    return <RouterProvider router={router}></RouterProvider>;
}

export default App