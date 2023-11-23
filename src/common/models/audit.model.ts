import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

/**
 * Creating the audit model
 * This will handle properties related with the creation and update of models
 * @property { createdAt } - Have the creation date of the object, it must not be update.
 * @property { updateAt } - Have the update date of the object, it will change any time the object is updated.
 */
export abstract class AuditModel {
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date

  @Column({ name: 'active', type: 'boolean', default: true })
    active: boolean
}
