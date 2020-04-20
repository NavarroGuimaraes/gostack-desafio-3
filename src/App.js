import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api'

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(repository => {
      setRepository(repository.data);
      console.log(repository.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo projeto criado em: ${Date(Date.now()).toLocaleString().split(',')[0]}`,
      url: 'url.com',
      techs: ["ruby", "python"]
    });

    const repository = response.data;

    setRepository([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      const _repositories = [...repositories];
    
      const removedIndex = _repositories.findIndex(r => r.id === id);
    
      _repositories.splice(removedIndex, 1);

      setRepository(_repositories)

    }    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
