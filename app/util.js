export function unixTimeToString(time) {
    return new Date(time).toLocaleString().substring(0,17);
}

export function unixTimeIsToday(time){
  return(new Date(time).toLocaleString().substring(0,10) === new Date().getTime().toLocaleString().substring(0,10));
}
