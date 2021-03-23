import { useTransactions } from "../../hooks/useTransaction";

import upImage from "../../assets/income.svg"
import downImage from "../../assets/outcome.svg"
import totalImage from "../../assets/total.svg"

import { Container } from "./styles";

export function Summary () {

  const { transactions } = useTransactions()

  // const totalDeposits = transactions.reduce((acc, transaction) => {
  //   if (transaction.type === 'deposit'){
  //     return acc + transaction.amount;
  //   }
  //   return acc;

  // },0)
  
  const summary = transactions.reduce((acc, transaction) =>{
    if (transaction.type === 'deposit'){
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }
    return acc;
  },
    {
      deposits:0,
      withdraws:0,
      total: 0
    }
  )

  return(
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={upImage} alt="Seta apontando para cima"/>
        </header>
        <strong>
        {Intl.NumberFormat('pr-BR',{
          style: 'currency',
          currency: 'BRL'
        }).format(summary.deposits)}
        </strong>
      </div>
      
      <div>
        <header>
          <p>Saídas</p>
          <img src={downImage} alt="Seta apontando para baixo"/>
        </header>
        <strong> -
        {Intl.NumberFormat('pr-BR',{
          style: 'currency',
          currency: 'BRL'
        }).format(summary.withdraws)}
        </strong>
      </div>
      
      <div className="highlighted-background">
        <header>
          <p>Total</p>
          <img src={totalImage} alt="Símbolo de cifrão"/>
        </header>
        <strong>
        {Intl.NumberFormat('pr-BR',{
          style: 'currency',
          currency: 'BRL'
        }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}