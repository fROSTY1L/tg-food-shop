import {Routes, Route} from 'react-router-dom'
import {adminRoutes, publicRoutes} from "../routes";
import { Layout } from 'antd';

const AppRouter = () => {
  const isAuth = true
  return (
    <Layout>
        <Routes>
            {isAuth && adminRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} Component={Component} />
                )}
                {publicRoutes.map(({path, Components}) =>
                    <Route key={path} path={path} Component={Components}/>
                )}
        </Routes>
    </Layout>
  )
}

export default AppRouter
