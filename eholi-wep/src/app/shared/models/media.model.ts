export interface Media {
  id: number
  model_id: string
  model_type: string
  uuid: string
  collection_name: string
  name: string
  file_name: string
  mime_type: string
  disk: string
  conversions_disk: string
  size: number
  manipulations: any[]
  custom_properties: any[]
  generated_conversions: GeneratedConversions
  responsive_images: any[]
  order_column: number
  created_at: Date
  updated_at: Date
  original_url: string
  preview_url: string
}

export interface GeneratedConversions {
  preview: boolean
}
