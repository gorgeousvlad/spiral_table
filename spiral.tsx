interface ICoords {
  x: number;
  y: number;
}

interface ISpiralTableState {
  x: number;
  y: number;
  hovered: ICoords | null; 
}

function getValue(start, step, n) {
  return start + step * (n - 1)
}

function getMatrix(x: number, y: number) {
  let matrix = Array(x).fill(null).map(()=>Array(y).fill(null))
  let curX = 0;
  let dX = 0;
  let curY = 0;
  let dY = 1;
  let i = 1;
  let value = 1;
  while(i <= x*y) {
    matrix[curX][curY] = getValue(value, 1 , i);
    const tempX = curX + dX;
    const tempY = curY + dY;
    if((tempX >= 0 && tempX < x) && (tempY >= 0 && tempY < y) && !Boolean(matrix[tempX][tempY])) {
        curX = tempX;
        curY = tempY;
    } else {
      [dY,dX] = [(-1)*dX, dY]
      curX = curX + dX;
      curY = curY + dY;
    }
    i++;
  }
 
  return matrix;
}

class SpiralTable extends React.Component<{},ISpiralTableState> {
  public state = {
    x: 3,
    y: 5,
    hovered: null,
  }
  public handleMouseEnter = (coords: ICoords) => {
    this.setState({hovered:coords})
  }
  public handleMouseLeave = () => {
    this.setState({hovered: null});
  }
  public render () {
    const {x,y, hovered} = this.state;
    const matrix = getMatrix(x,y);
    return (
      <div className='container'>
      <form>
       <label htmlFor='inputX'>Rows</label>
         <input 
            id='inputX'
            value={x}
            maxLength='2'
            type='text'
            onChange={(e)=>this.setState({x: Number(e.target.value)})}
         >
         </input>
         <label htmlFor='inputY'>Columns</label>
         <input
            id='inputY'
            value={y}
            maxLength='2'
            type='text'
            onChange={(e)=>this.setState({y: Number(e.target.value)})}
        >
      </input>
      </form>
      {matrix.map((row,i) => {
        return (<div className='table-container'>{
          row.map((num,j)=>{
            return (
              <div 
                  onMouseEnter={() => this.handleMouseEnter({x:j, y:i})}
                  onMouseLeave={() => this.handleMouseLeave()}
                  className='cell'>
                  {num}
                  {hovered && hovered.x === j && hovered.y === i
                    ? <div className="popup">{`${i + 1} x ${j + 1}`}</div>
                    : null }
              </div>);
        })
        }</div>);
      })}
      </div>
    );
  }
  
}

React.render(<SpiralTable />, document.getElementById('app'));
