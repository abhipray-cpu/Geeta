import { RouterProvider,createBrowserRouter } from "react-router-dom";

import Landing,{loader as landingLoader} from './pages/Landing'
import Chapter from './pages/Chapter'
import Shlok,{loader as shlokLoader} from './pages/Shlok'
import NotFound from './pages/NotFound'

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
            path:'/shlok/:chapter/:shlok',
            element:<Shlok></Shlok>,
            loader:shlokLoader,
            id:"shlok"
        },
        {
    path: "*",
    element: <NotFound></NotFound>,
  },
    ]
)
function App(){
    return <RouterProvider router={router}></RouterProvider>;
}

export default App