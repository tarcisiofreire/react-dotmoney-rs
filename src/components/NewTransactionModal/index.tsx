import React, { FormEvent, useState} from "react";
import { useTransactions } from "../../hooks/useTransaction";
import Modal from "react-modal"

import closeImage from "../../assets/close.svg";
import imgUp from "../../assets/income.svg"
import imgDown from "../../assets/outcome.svg"

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTransactionModalProps{
  isOpen:boolean;
  onRequestClose:() => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');
  
  async function handleNewTransaction(event: FormEvent){
    event.preventDefault();
    
    await createTransaction({
      title, amount, category, type
    })

    setTitle('');
    setCategory('');
    setAmount(0);
    setType('deposit');

    onRequestClose();
  }
  
  return(
    <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
    >
        <button 
          type="button" 
          className="react-modal-close"
          onClick={onRequestClose}>
          <img 
            src={closeImage} 
            alt="Botão de fechar"
          />
        </button>
        <Container onSubmit={handleNewTransaction}>
          <h2>Cadastrar Transação</h2>
          <input 
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Título"/>
          <input 
            type="number"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
            placeholder="Valor"/>

          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => {setType('deposit')}}
              isActive={type === 'deposit'}
              colorActive={'green'}
              >
              <img src={imgUp} alt="Entrada de dinheiro"/>
              <span>Entrada</span>
            </RadioBox>
            <RadioBox
              type="button"
              onClick={() => {setType('withdraw')}}
              isActive={type === 'withdraw'}
              colorActive={'red'}
              >
              <img src={imgDown} alt="Entrada de dinheiro"/>
              <span>Saída</span>
            </RadioBox> 
          </TransactionTypeContainer>

          <input 
            type="text"
            value={category}
            onChange={event => setCategory(event.target.value)}
            placeholder="Categoria"/>

          <button type="submit">
            Cadastrar
          </button>
        </Container>
    </Modal>
  );
}