export default function Pool() {

  const data = JSON.parse(localStorage.getItem('formData'));
  const totalAmount = data.totalAmount;
  const poolName = data.poolName;

  return (
      <div>
        <h2>Votre cagnotte</h2>
        <h2>{poolName}</h2>
        <p>est de</p>
        <h2>{totalAmount}€</h2>
      </div>
  )
}