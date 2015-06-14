import json
import pdb
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core.urlresolvers import reverse
from tesigners.models import *

def value_from_req(request,key,default):
    value = getattr(request, 'GET').get(key)
    if not value:
        value = getattr(request, 'POST').get(key)
    if not value:
        return default
    return value

def int_or_0(value):
    try:
        return int(value)
    except:
        return 0

def index(request):
    return render_to_response("index.html",locals(),context_instance=RequestContext(request))

def dashboard(request):
    return render_to_response("dashboard.html",locals(),context_instance=RequestContext(request))

def login(request):
    return render_to_response("dashboard.html",locals(),context_instance=RequestContext(request))

def signup(request):
    return render_to_response("signup.html",locals(),context_instance=RequestContext(request))

def authenticate_user(request):
    email = value_from_req(request,'email_id','')
    password = value_from_req(request,'password','')
    seller = Seller.objects(email_id = email).first()
    if not seller:
        return HttpResponse(json.dumps({'status':'failed','message':'User does not exist'}))
    validLogin = seller.check_password(password)
    if not validLogin:
        return HttpResponse(json.dumps({'status':'failed','message':'Username and password did not match'}))
    return HttpResponse(json.dumps({'status':'success','user':email,'message':'login successful'}))

def create_user(request):

    email = value_from_req(request,'eId','')
    password = value_from_req(request,'password','')
    phoneNumber = value_from_req(request,'pNumber','')
    bName = value_from_req(request,'bName','')
    dName = value_from_req(request,'dName','')
    vNum = value_from_req(request,'vNum','')
    cDesc = value_from_req(request,'cDesc','')

    addr1 = value_from_req(request,'addr1','')
    addr2 = value_from_req(request,'addr2','')
    landmark = value_from_req(request,'landmark','')
    city = value_from_req(request,'city','')
    state = value_from_req(request,'state','')
    pincode = value_from_req(request,'pCode','')

    acHName = value_from_req(request,'holder_name','')
    acNumber = value_from_req(request,'acNumber','')
    bankName = value_from_req(request,'bankName','')
    branchName = value_from_req(request,'branchName','')
    ifsc = value_from_req(request,'ifsc','')

    seller = Seller.objects(email_id = email).first()
    if not seller:
        seller = Seller()
    if seller.address:
        address = seller.address
    if not seller.address:
        address = Address()
    if seller.bank_acc:
        bankAccount = seller.bank_acc
    if not seller.bank_acc:
        bankAccount = BankAccount()

    address.address_ine_1 = addr1
    address.address_ine_2 = addr2
    address.landmark = landmark
    address.city = city
    address.state = state
    address.pincode = int_or_0(pincode)
    address.save()

    bankAccount.holder_name = acHName
    bankAccount.account_number = int_or_0(acNumber)
    bankAccount.bank_name = bankName
    bankAccount.branch = branchName
    bankAccount.ifsc = ifsc
    bankAccount.save()

    #seller = Seller()
    seller.email_id = email
    seller.phone_number = int_or_0(phoneNumber)
    seller.business_name = bName
    seller.display_name = dName
    seller.company_description = cDesc
    seller.vat = vNum

    seller.address = address
    seller.bank_acc = bankAccount
    if not password == '':
        seller.set_password(password)
    seller.save()

    #return render_to_response("signup.html",locals(),context_instance=RequestContext(request))
    return HttpResponse(json.dumps({'status':'success','user':email,'message':'signup successful'}))

def store_seller_supported_products(request):
    
    data=json.loads(request.body)
    seller_id = data['sId']
    product_list = data['plist']
    printing_type_list = data['ptlist']

    seller = Seller.objects(email_id=seller_id).first()

    if seller:
        Product.objects(seller=seller).delete()
        for item in product_list:
            productType =  item['k1ptype']
            productSubType =  item['k2psubtype']
            price = item['k6price']
            #sku = value_from_req(request,'item.sku','')
            #size = item['size']
            #color = item['color']
            sleeves = item['k4sleeves']
            fabric = item['k3fabric']
            material = item['k5material']

            #seller_product = Seller_Product()
            #seller_product.seller = seller;
            #seller_product.price = price
            #seller_product.product_sku = sku
            #seller_product.save()

            product = Product()
            product.seller=seller
            product.type=productType
            product.subtype=productSubType
            #product.size=size
            #product.color=color
            product.sleeves=sleeves
            product.fabric=fabric
            product.material=material
            product.price=int_or_0(price)
            product.save()

        for item in printing_type_list:
            printingType = item['k1type']
            min_order = item['k2min_order']
            order_capacity= item['k3order_capacity']
            printing_price = item['k4printing_price']

            printer_type = PrinterType()
            printer_type.seller = seller;
            printer_type.type = printingType;
            printer_type.min_order = int_or_0(min_order);
            printer_type.order_capacity = int_or_0(order_capacity)
            printer_type.printing_price = int_or_0(printing_price)
            printer_type.save()

        return HttpResponse(json.dumps({'status':'success','message':'Selected product categories added successfully'}))



def get_seller_supported_products(request):
    seller_id= value_from_req(request,'email_id','')

    seller = Seller.objects(email_id=seller_id).first()
    products = Product.objects(seller=seller)
    supportedproducts = []
    if products:
        for item in products:
            productType =  item.type
            productSubType =  item.subtype
            fabric = item.fabric
            sleeves = item.sleeves
            material = item.material
            price = item.price
            #sku = value_from_req(request,'item.sku','')
            #size = item['size']
            #color = item['color']
            supportedproducts.append({"k1ptype": productType, "k2psubtype": productSubType, "k3fabric": fabric, "k4sleeves" : sleeves, "k5material":material, "k6price":price})

            #seller_product = Seller_Product()
            #seller_product.seller = seller;
            #seller_product.price = price
            #seller_product.product_sku = sku
            #seller_product.save()

    printing_type_list = PrinterType.objects(seller = seller)
    printing_type = []
    if printing_type_list:
        for printer_type in printing_type_list:
            printingType = printer_type.type
            min_order = printer_type.min_order
            order_capacity= printer_type.order_capacity
            printing_price = printer_type.printing_price
            printing_type.append({"k1type": printingType, "k2min_order": min_order, "k3order_capacity" :order_capacity, "k4printing_price" : printing_price})

    return HttpResponse(json.dumps({'status':True,'supportedEntities':supportedproducts, 'supportedIds': [], 'supportedPrinters': printing_type}, sort_keys=True))


def show_order(request):
    seller_id = value_from_req(request,'email_id','')
    order_type = value_from_req(request,'type','')

    seller = Seller.objects(email_id=seller_id).first()

    if seller:
        orders = []
        if order_type == '0':
            for order in OrderDetails.objects(seller=seller,current_status__lt=7):
                orders.append({'key1img':order.design_image,'key2description':order.product.type,'key3qty':order.quantity,'key4price':order.price,'key5status':order.current_status})

        elif order_type == '1':
            for order in OrderDetails.objects(seller=seller,current_status__gte=7, current_status__lte=9):
                orders.append({'key1img':order.design_image,'key2description':order.product.type,'key3qty':order.quantity,'key4price':order.price,'key5status':order.current_status})

        elif order_type == '2':
            for order in OrderDetails.objects(seller=seller,current_status__gt=9):
                orders.append({'key1img':order.design_image,'key2description':order.product.type,'key3qty':order.quantity,'key4price':order.price,'key5status':order.current_status})

        return HttpResponse(json.dumps({'status':True,'response':orders}, sort_keys=True))

def get_seller_details(request):
    seller_id = value_from_req(request,'email_id','')
    seller = Seller.objects(email_id=seller_id).first()
    if seller:
        address = seller.address
        bank_acc = seller.bank_acc
        account_info = {'eId':seller_id,'bName':seller.business_name, 'dName':seller.display_name,'cDesc':seller.company_description, 'vNum':seller.vat,'pNumber':seller.phone_number};
        address_info ={'addr1':address.address_ine_1,'addr2':address.address_ine_2, 'landmark':address.landmark,'state':address.state,'city':address.city,'pCode':address.pincode}
        bank_info ={'holder_name':bank_acc.holder_name,'acNumber':bank_acc.account_number, 'bankName':bank_acc.bank_name,'branchName':bank_acc.branch,'ifsc':bank_acc.ifsc}
        return HttpResponse(json.dumps({'status':True,'account_info':account_info,'address_info':address_info,'bank_info':bank_info}))

    if not seller:
        return HttpResponse(json.dumps({'status':False,'account_info':'','address_info':'','bank_info':''}))
