const SPEED = 0.02;
export default class Platform {
  constructor(platform) {
    this.platform = platform;
    this.reset();
  }
  get position() {
    //here will get position of a player from css property
    return parseFloat(
      getComputedStyle(
        this.platform /*this player will obtain property of position */
      ).getPropertyValue("--position")
    ); //converting this value to float
  }
  set position(positionVal) {
    //will set x to prop value to move a platform
    this.platform.style.setProperty("--position", positionVal);
  }
  update(delta, ballPositionY) {
    this.position += SPEED * delta * (ballPositionY - this.position); //
    /**(ballPositionY-this.position)<0 the cmp
     * platform will move down
     * if >0 will move up
     */
  }
  reset() {
    this.position = 50;
  }
}
