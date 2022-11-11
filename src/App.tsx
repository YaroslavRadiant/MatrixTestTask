import {Provider} from 'react-redux'
import './App.css'
import Matrix from './components/Matrix/Matrix'
import {store} from './components/store'

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Matrix />
      </div>
    </Provider>
  )
}

export default App
