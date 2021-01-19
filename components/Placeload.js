export default function placeload(props) {
  const { rounded, width, height, size } = props
  const styles = {
    width: width || 100 + '%',
    height: height || 10 + 'px',
  }

  return (
    <>
      <div>
      {rounded ? (
        <span
          className="_rounded-preload _animated-preload"
        />
      ): (
        <span
          style={styles}
          className="_preload _animated-preload"
        />
      )}
      </div>
    </>
  )
}
