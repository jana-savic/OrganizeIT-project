const ProgressBar = ({ progress }) => {

  const colors = [
    'rgb(255,214,161)',
    'rgb(255,175,163)',
    'rgb(255,115,148)',
    'rgb(141,181,145)'
  ]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  
  //poziva se u List Item
  return (
    <div className="outer-bar">
      <div className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: randomColor }}
      ></div>
    </div>
  )
}

export default ProgressBar