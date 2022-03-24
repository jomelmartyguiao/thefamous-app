type DashboardProps = {
  dok_balance: number
  created_items: number
  bought_items: number
}

type CollectionProps = {
  banner: string
  code: string
  details: string
  discord: string
  floor_price_algo: string
  floor_price_bnb: string
  id: string
  instagram: string
  logo: string
  name: string
  telegram: string
  total_items: string
  total_owned: string
  total_owners: string
  twitter: string
  website: string
}

type ItemProps = {
  button: string
  code: string
  collection_id: string
  details: string
  icon: string
  id: string
  image: string
  network: string
  name: string
  owner: string
  owner_id: string
  uuid: string
  hearts: string
  views: string
  series: string
  sold: string
  asset_id: string
  properties: Array<ItemTraitProps>
  price: ItemPriceProps
  token_standard: string
  listed: string
  price_usd: string
  offers: Array<{
    coin: string
    creator: string
    id: string
    price: number
    reference_number: string
    created_at: string
  }>
  bids: Array<{
    coin: string
    creator: string
    id: string
    price: number
    reference_number: string
    created_at: string
  }>
}

type ItemPriceProps = {
  bnb: string | number;
  usd: string | number;
  algo: string | number;
  eth: string | number;
}

type TradeDashboardProps = {
  total: string
  average: string
  volume: string
}

type ItemTraitProps = {
  code: string
  id: string
  label: string
  trait_code: string
  trait_label: string
  trait_value: string
  value: string
}

type TraitProps = {
  id: string,
  code: string,
  label: string,
  value: string,
  properties: Array<TraitValueProps>
}

type TraitValueProps = {
  id: string,
  code: string,
  label: string,
  value: string,
}

type ActivityProps = {
  id: string,
  type: string,
  details: string,
  created_at: string,
}

interface MyCopyrightProps {
  achieved_date: string;
  attribution: string;
  author: string;
  category: string;
  commercial: string;
  copyright_type: string;
  cost: string;
  country: string;
  created_at: string;
  created_by: string;
  creator_email: string;
  deleted_at: string;
  derivative: string;
  description: string;
  duration: string;
  id: string;
  name: string;
  nature_of_work: string;
  notice: string;
  number_of_copies: number;
  open_distribution: string;
  others: string;
  owner_id: string;
  owners: Array<{
    client_id: string;
    created_at: string;
    created_by: string;
    deleted_at: string
    email: string;
    name: string;
    owner_id: string;
    profile: string;
    type: string;
    updated_at: string;
    updated_by: string
  }>;
  parent_id: string
  promo_discount: string
  pseudo: string
  reference_number: string;
  registration_number: string;
  statement: string;
  status: string;
  supply: string;
  type: string;
  under_license: string;
  updated_at: string;
  updated_by: string;
  work_reference: string;
  total_nft: string,
}
interface BlockchainProps {
  attachments: Array<{
    copyright_id: string,
    created_at: string,
    description: string,
    file_name: string,
    file_path: string,
    hash: string,
    id: string,
    name: string,
    type: string,
    updated_at: string,
    url: string,
  }>
  url: string,
  certificate: string,
  certificate_status: string,
  blockchain: Array<{
    created_at: string
    created_by: string
    id: string
    item_id: string
    status: string
    to_wallet_address: string
    transaction_hash: string
    type: string
    uuid: string
    wallet_address: string
  }>,
  certificates: Array<{
    copyright_id: string,
    created_at: string,
    description: string,
    file_name: string,
    file_path: string,
    hash: string,
    id: string,
    name: string,
    type: string,
    updated_at: string,
    url: string,
  }>,
  details: MyCopyrightProps,
  history: Array<{
    copyright_id: string,
    created_at: string,
    created_by: string,
    creator: string,
    event: string,
    id: string,
    updated_at: string,
    details: string,
  }>,
  notice: string,
  ownerships: Array<{
    algorand_address: string
    created_at: string
    created_by: string
    email: string
    id: string
    item_id: string
    user_id: string
    username: string
    wallet: string
  }>
  statement: string,
  summary: string,
  summary_status: string,
  updates: [{
    created_at: string,
    description: string,
    name: string,
    type: string,
    url: string,
  }]
  works: [{
    copyright_id: string,
    created_at: string,
    description: string,
    file_name: string,
    file_path: string,
    hash: string,
    id: string,
    name: string,
    type: string,
    updated_at: string,
    url: string,
  }]
}

type WalletProps = {
  address: string
  id: string
  network: string
  primary: string
  type: string
}

type BillingProps = {
  address: string
  balance: number
  id: string
  network: string
  primary: string
  type: string
}

export type {
  CollectionProps,
  ItemProps,
  TraitProps,
  TraitValueProps,
  BlockchainProps,
  DashboardProps,
  ActivityProps,
  WalletProps,
  BillingProps,
  TradeDashboardProps,
};
