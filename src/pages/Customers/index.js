
import { useState, useEffect, useCallback } from 'react';
import './customers.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import firebase from '../../services/firebaseConnection';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';



export default function Customers(){
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [customers, setCustomers] = useState([]);

  const history = useHistory();

  useEffect(()=>{
    listCustomers();
  },[])

  async function listCustomers(){
    await firebase.firestore().collection('customers').get()
    .then((snapshot)=>{
      let lista=[];
      snapshot.forEach((doc) => {
        lista.push({
          nomeFantasia: doc.data().nomeFantasia,
          cnpj: doc.data().cnpj
        })
      })
      setCustomers(customers => [...customers, ...lista]);
    })
  }
  async function handleAdd(e){
    e.preventDefault();
    
    if(nomeFantasia !== '' && cnpj !== '' ){
      await firebase.firestore().collection('customers')
      .add({
        nomeFantasia: nomeFantasia,
        cnpj: cnpj,
      })
      .then(()=>{
        setNomeFantasia('');
        setCnpj('');
        history.push('/new');
        toast.info('Empresa cadastrada com sucesso!');
      })
      .catch((error)=>{
        console.log(error);
        toast.error('Erro ao cadastrar essa empresa.');
      })
    }else{
      toast.error('Preencha todos os campos!')
    }

  }


  return(
    <div>
      <Header/>

    <div className="content">
      <Title name="Clientes">
        <FiUser size={25} />
      </Title>

      <div className="container">
        <form className="form-profile customers" onSubmit={handleAdd}>
          <label>Nome fantasia</label>
          <input type="text" placeholder="Nome da empresa" value={nomeFantasia} onChange={ (e) => setNomeFantasia(e.target.value) } />

          <label>CNPJ</label>
          <input type="text" placeholder="Seu CNPJ" value={cnpj} onChange={ (e) => setCnpj(e.target.value) } />

          <button type="submit">Cadastrar</button>

        </form>
      </div>
      <h1 className='h1-customers'>Clientes já cadastrados :</h1>
      {customers.map((item,index)=>{
        return(
          <ul className='list-customers' key={index}>
            <li> Cliente : {item.nomeFantasia}</li>
          </ul>
        );
      })}
    </div>
       
    </div>
  )
}