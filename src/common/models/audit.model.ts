import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class AuditModel {
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date

  @Column({ name: 'active', type: 'boolean', default: true })
    active: boolean
}
