import BestSeller from '../../components/products/BestSeller'
import Sale from '../../components/Sale'
import ContentHeader from '../../components/ContentHeader'
import CardV2 from '../../components/products/CardV2'

export default function accountRelated() {
  return (
    <>
      <div className="mb-4">
        <ContentHeader title="Terakhir Dilihat" />
        <Sale />
      </div>
      <BestSeller />
    </>
  )
}
