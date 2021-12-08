
export const Dispatch = class Dispatch {
  dict: {[key:string]: Array<Function> }
  private constructor(...dictKeys: Array<string>){
    this.dict = {}
    for(let i = 0; i < dictKeys.length; i++){
      this.dict[dictKeys[i]] = []
    }
  }
  on(key: string, cb: Function ) {
    this.dict[key].push(cb)
  }
  call(key: string, ...args: Array<any>) {
    this.dict[key].forEach(i => i(...args))
  }
  static of(...args: Array<string>): Dispatch {
    return new Dispatch(...args)
  }
}
