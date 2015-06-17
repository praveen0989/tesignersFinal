from mongoengine import *
from django.conf import settings
from time import time
from django.contrib.auth.hashers import check_password, make_password
connect('tesigners',host=settings.MONGO_HOST,port=settings.MONGO_PORT)

# Create your models here.

class Customer(Document):
    email_id                  = StringField(db_field='eid',required=False,default='')
    password                  = StringField(db_field='pass',required=False)
    fb_id                     = StringField(unique=True,db_field='fbid',required=False)
    small_img_url             = StringField(db_field='si',required=False)
    large_image               = StringField(db_field='li',required=False)
    first_name                = StringField(db_field='fn',required=False)
    last_name                 = StringField(db_field='ln',required=False)
    name                      = StringField(db_field='n',required=False)
    location                  = DictField(db_field='loc',required=False)
    gender                    = StringField(db_field='gen',required=False)
    friends                   = ListField(DictField(),db_field='fr',required=False)
    birthday                  = StringField(db_field='bd',required=False)
    created_at                = IntField(required = False, db_field='ct')
    updated_at                = IntField(required = False , db_field='ut')

    def set_password(self,password):
        self.password = make_password(password)

    def check_password(self,password):
        return check_password(password,self.password)

    def save(self, force_insert=False, validate=True, clean=True,
             write_concern=None,  cascade=None, cascade_kwargs=None,
             _refs=None, **kwargs):
        if not self.id:
            self.created_at = int(time())
        self.updated_at = int(time())
        super(Customer, self).save(force_insert=False, validate=True, clean=True,
             write_concern=None,  cascade=None, cascade_kwargs=None,
             _refs=None, **kwargs)

class Address(Document):
    address_ine_1            = StringField(db_field='al1',required=True,default='')
    address_ine_2            = StringField(db_field='al2',required=False,default='')
    landmark                 = StringField(db_field='lm',required=False,default='')
    city                     = StringField(db_field='cty',required=True,default='')
    state                    = StringField(db_field='sta',required=True,default='')
    pincode                  = IntField(db_field='pin',required=True,default='')
    created_at               = IntField(required = False, db_field='ct')
    updated_at               = IntField(required = False , db_field='ut',default=int(time()))

    def get_formatted_address(self):
        pass

    def save(self, force_insert=False, validate=True, clean=True,
             write_concern=None,  cascade=None, cascade_kwargs=None,
             _refs=None, **kwargs):
        if not self.id:
            self.created_at = int(time())
        self.updated_at = int(time())
        super(Address, self).save(force_insert=False, validate=True, clean=True,
             write_concern=None,  cascade=None, cascade_kwargs=None,
             _refs=None, **kwargs)

class BankAccount(Document):

    holder_name              =  StringField(db_field='nm',required=True,default='')
    account_number           =  IntField(db_field='an',required=True,default='')
    ifsc                     =  StringField(db_field='ifsc',required=True,default='')
    bank_name                =  StringField(db_field='bn',required=True,default='')
    branch                   =  StringField(db_field='br',required=True,default='')
    created_at               =  IntField(required = False, db_field='ct')
    updated_at               =  IntField(required = False , db_field='ut')

    def save(self, force_insert=False, validate=True, clean=True,
             write_concern=None,  cascade=None, cascade_kwargs=None,
             _refs=None, **kwargs):
        if not self.id:
            self.created_at = int(time())
        self.updated_at = int(time())
        super(BankAccount, self).save(force_insert=False, validate=True, clean=True,
             write_concern=None,  cascade=None, cascade_kwargs=None,
             _refs=None, **kwargs)

class Seller(Document):
    email_id                 = StringField(db_field='eid',required=False,default='')
    session_id               = StringField(db_field='sesid',required=False)
    password                 = StringField(db_field='pass',required=False)
    business_name            = StringField(db_field='bn',required=True,default='')
    display_name             = StringField(db_field='dn',required=False,default='')
    company_description      = StringField(db_field='desc',required=False,default='')
    phone_number             = IntField(db_field='pn',required=True,default='')
    vat                      = StringField(db_field='vat',required=False,default='')
    address                  = ReferenceField(Address,db_field='addr',required=False,reverse_delete_rule=CASCADE)
    bank_acc                 = ReferenceField(BankAccount,db_field='ba',required=False,reverse_delete_rule=CASCADE)
    created_at               = IntField(required = False, db_field='ct')
    updated_at               = IntField(required = False , db_field='ut')

    def set_password(self,password):
        self.password = make_password(password)
        self.save()
        return self

    def check_password(self,password):
        return check_password(password,self.password)

    def save(self, force_insert=False, validate=True, clean=True,
             write_concern=None,  cascade=None, cascade_kwargs=None,
             _refs=None, **kwargs):
        if not self.id:
            self.created_at = int(time())
        self.updated_at = int(time())
        super(Seller, self).save(force_insert=False, validate=True, clean=True,
             write_concern=None,  cascade=None, cascade_kwargs=None,
             _refs=None, **kwargs)




class Product(Document):

    seller                   =  ReferenceField(Seller,db_field='sel',required=True)
    type                     =  StringField(db_field='typ',required=False)
    subtype                  =  StringField(db_field='styp',required=False)
    size                     =  StringField(db_field='sz',required=False)
    color                    =  StringField(db_field='col',required=False)
    sleeves                  =  StringField(db_field='sle',required=False)
    fabric                   =  StringField(db_field='fab',required=False)
    material                 =  StringField(db_field='mat',required=False)
    price                    =  IntField(db_field='ppr')

    meta = {
            'allow_inheritance':True
        }

class PrinterType(Document):

    seller                   =  ReferenceField(Seller,db_field='se')
    pttype                   =  StringField(db_field='ptyp',required=False)
    min_order                =  IntField(db_field='mo',required=False)
    order_capacity           =  IntField(db_field='oc',required=False)
    printing_price           =  IntField(db_field='ptpr',required=False)
    tat                      =  IntField(db_field='tat',required=False)

class Seller_Product(Document):

    seller                   =  ReferenceField(Seller,db_field='sps')
    product                  =  ReferenceField(Product,db_field='spp')
    price                    =  IntField(db_field='sppr',required=False)
    product_sku              =  StringField(db_field='psku', required = False)

class ShippingDetails(Document):

    tracking_id                      = StringField(db_field='ti', required = False)
    shipping_address                 = ReferenceField(Address,db_field='sad')
    shipping_type                    = StringField(db_field='st', required = False)


class OrderDetails(Document):
    order_id                 = StringField(db_field='oid')
    product                  =  ReferenceField(Product,db_field='pr')
    printing_type            =  ReferenceField(PrinterType,db_field='pt')
    quantity                 =  IntField(db_field='qua',required=False)
    previous_status          =  ListField(db_field='ps')
    current_status           =  IntField(db_field='cs')
    price                    =  IntField(db_field='pri')
    buyer                    =  ReferenceField(Customer,db_field='bu')
    seller                   =  ReferenceField(Seller,db_field='sel')
    design_image             =  StringField(db_field='di',required=True)
    all_image                =  StringField(db_field='ai',required=True)
    shipping_detail          =  ReferenceField(ShippingDetails,db_field='sd')
    created_at               =  IntField(required = False, db_field='ct')
    updated_at               =  IntField(required = False , db_field='ut')

    def save(self, force_insert=False, validate=True, clean=True,
             write_concern=None,  cascade=None, cascade_kwargs=None,
             _refs=None, **kwargs):
        if not self.id:
            self.created_at = int(time())
            self.order_id = str(int(time()))
        self.updated_at = int(time())
        super(OrderDetails, self).save(force_insert=False, validate=True, clean=True,
             write_concern=None,  cascade=None, cascade_kwargs=None,
             _refs=None, **kwargs)
